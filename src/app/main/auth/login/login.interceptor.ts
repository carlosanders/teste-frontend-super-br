import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {LoginService} from './login.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkLoginDialogComponent} from '@cdk/components/login/cdk-login-dialog/cdk-login-dialog.component';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {getConfig, getErrorMessage, getLoadingConfig, getToken} from './store';
import {environment} from '../../../../environments/environment';
import {distinctUntilChanged, filter, switchMap, take} from 'rxjs/operators';
import {getRouterState} from '../../../store';
import {MatSnackBar} from '@cdk/angular/material';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    config$: Observable<any>;
    config: any;
    loadingConfig$: Observable<boolean>;
    loadingConfig: boolean;
    loading$: Subject<boolean> = new Subject<boolean>();
    errorMessage$: Observable<any>;

    loginError: any;

    token$: Observable<string>;
    token: string;

    loginSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    dialogRef: MatDialogRef<CdkLoginDialogComponent>;

    subscribers: any;

    configUrl: string = environment.base_url + 'config';

    routerState: any;
    private loginProgress = false;

    constructor(
        private store: Store<fromStore.LoginState>,
        private loginService: LoginService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private _router: Router
    ) {
        this.token = this.loginService.getToken();
        this.config$ = this.store.pipe(select(getConfig));
        this.loadingConfig$ = this.store.pipe(select(getLoadingConfig));
        this.errorMessage$ = this.store.pipe(select(getErrorMessage));
        this.token$ = this.store.pipe(select(getToken));

        this.store.pipe(select(getRouterState)).subscribe(state => this.routerState = state?.state);

        this.token$
            .pipe(
                distinctUntilChanged(),
                filter(result => !!result),
            ).subscribe((token) => {
                this.token = token;
                if (this.loginProgress && !this.loginError) {
                    this.loginProgress = false;
                    this.loginSubject.next(true);
                }
            });

        this.config$
            .pipe(
                filter(result => !!result)
            )
            .subscribe((config) => {
                this.config = config;
                if (this._router.url !== '/auth/login' && this.routerState?.url.indexOf('/auth/login') === -1 && !this.loginProgress) {
                    this.loginProgress = true;
                    this.openDialog();
                }
            });

        this.loadingConfig$.pipe(filter(result => !!result)).subscribe(loading => this.loadingConfig = loading);

        this.errorMessage$
            .pipe(
                distinctUntilChanged(),
            )
            .subscribe((error) => {
                this.loginError = error;
                if (error && this.loginProgress) {
                    this.snackBar.dismiss();
                    this.openDialog();
                }
            });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.token && request.url.startsWith(this.configUrl) === false && request.url.indexOf('get_token') === -1) {
            if (!this.loginService.isExpired()) {
                // Existe um token e ele ainda é válido
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                return next.handle(request);
            } else if (this._router.url === '/' && this.routerState?.url.indexOf('auth') === -1) {
                // Esta requisição veio de um F5 com token inválido/URL compartilhada com token inválido, enviar para
                // tela de login
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                return next.handle(request);
            } else if (!this.loginProgress) {
                // Token expirou, aguardar ação de login antes de dar next
                if ((!this.config || this.config.error) && !this.loadingConfig) {
                    this.store.dispatch(new fromStore.GetConfig());
                } else if (this.config) {
                    this.loginProgress = true;
                    this.openDialog();
                }

                return this.loginSubject.pipe(
                    filter(result => result !== null),
                    take(1),
                    switchMap(() => {
                        // Aqui, o valor que chega do token já é o atualizado após o relogin
                        this.loginProgress = false;
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${this.token}`
                            }
                        });
                        return next.handle(request);
                    })
                );
            }
        } else {
            return next.handle(request);
        }
    }

    openDialog(): void {
        this.loginSubject.next(null);

        this.dialogRef = this.dialog.open(CdkLoginDialogComponent, {
            data: {
                loading$: this.loading$,
                config$: this.config$,
                loadingConfig$: this.loadingConfig$,
                errorMessage$: this.errorMessage$,
                username: this.loginService.getUserProfile()?.username
            },
            disableClose: true,
            height: '95%',
        });

        this.subscribers = this.dialogRef.afterClosed().subscribe((result) => {
            if (result.tipoLogin === 'interno') {
                this.onSubmitInterno(result);
            } else if (result.tipoLogin === 'ldap') {
                this.onSubmitLdap(result);
            }
        });
    }

    onSubmitInterno(values): void {
        const payload = {
            username: !!this.loginService.getUserProfile()?.username ? this.loginService.getUserProfile().username : values.username,
            password: values.password,
            redirect: false
        };
        this.store.dispatch(new fromStore.Login(payload));
    }

    onSubmitLdap(values): void {
        const payload = {
            username: values.username,
            password: values.password,
            redirect: false
        };
        this.store.dispatch(new fromStore.LoginLdap(payload));
    }
}
