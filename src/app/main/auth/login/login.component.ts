import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';
import * as fromStore from 'app/main/auth/login/store';
import {getLoginAppState} from 'app/main/auth/login/store';
import {environment} from '../../../../environments/environment';
import {getRouterState} from '../../../store';
import {getConfig, getErrorMessage, getLoadingConfig} from './store';
import {LoginService} from './login.service';
import {filter} from 'rxjs/operators';
import packageInfo from '../../../../../package.json';
import * as LoginActions from "./store/actions/login.actions";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class LoginComponent implements OnInit {
    getLoginState: Observable<any>;
    errorMessage$: Observable<any>;
    loadingConfig$: Observable<boolean>;
    loading$: Subject<boolean> = new Subject<boolean>();
    certificadoDigital = '';
    routerState: any;

    config$: Observable<any>;

    config: any;

    version: string = packageInfo.version;

    versionChanged$: Observable<string>;

    /**
     *
     * @param cdkConfigService
     * @param store
     * @param _dialog
     * @param _router
     * @param _loginService
     */
    constructor(
        private cdkConfigService: CdkConfigService,
        private store: Store<fromStore.LoginState>,
        private _dialog: MatDialog,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.cdkConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.getLoginState = this.store.pipe(select(getLoginAppState));
        this.config$ = this.store.pipe(select(getConfig));
        this.errorMessage$ = this.store.pipe(select(getErrorMessage));
        this.loadingConfig$ = this.store.pipe(select(getLoadingConfig));
        this.versionChanged$ = this.store.pipe(select(fromStore.getVersionChanged));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.versionChanged$.pipe(
            filter(changed => !!changed)
        ).subscribe(versionChanged => {
            const dialogRef = this._dialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Nova versão lançada',
                    confirmLabel: 'Recarregar',
                    hideCancel: true,
                    message: 'Uma nova versão do sistema (' + versionChanged + ') está disponível. O sistema precisa ser recarregado.'
                },
                disableClose: true
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.store.dispatch(new LoginActions.Logout({url: this.routerState?.url}));
                }
            });
        });

        this.store.dispatch(new fromStore.Unload());

        this.loading$.next(false);

        this.getLoginState.subscribe(() => {
            this.loading$.next(false);
        });

        this.config$.pipe(
            filter(config => !!config)
        ).subscribe((config) => {
            this.config = config;
            window.document.title = config.sigla;
            this.cdkConfigService.logo = config.logo;
            this.cdkConfigService.icone = config.icone;
            this.cdkConfigService.nome = config.name;
            this.cdkConfigService.sigla = config.sigla;
            this.cdkConfigService.barramento = config.barramento;
            localStorage.setItem('barramento', config.barramento);
        });

        if (environment.base_url_x509) {
            this.certificadoDigital = environment.base_url_x509;
        }

        if (this.routerState.queryParams['token'] &&
            this.routerState.queryParams['exp'] &&
            this.routerState.queryParams['timestamp']) {
            this.store.dispatch(new fromStore.LoginSuccess({
                token: this.routerState.queryParams['token'],
                exp: this.routerState.queryParams['exp'],
                timestamp: this.routerState.queryParams['timestamp'],
                redirect: true
            }));
        }

        if (this.routerState.queryParams['code']) {
            this.store.dispatch(new fromStore.LoginGovBR({
                code: this.routerState.queryParams['code'],
                redirect: true
            }));
        }
    }

    reloadConfig(): void {
        this.store.dispatch(new fromStore.GetConfig());
    }

    onSubmit(values): void {
        this.loading$.next(true);
        if (values.tipoLogin === 'externo') {
            this.onSubmitExterno(values);
        } else if (values.tipoLogin === 'ldap') {
            this.onSubmitLdap(values);
        }
    }

    onSubmitExterno(values): void {
        const payload = {
            username: values.username.replace(/\D/g, ''),
            password: values.password
        };
        this.store.dispatch(new fromStore.Login(payload));
    }

    onSubmitLdap(values): void {
        const payload = {
            username: values.username,
            password: values.password
        };
        this.store.dispatch(new fromStore.LoginLdap(payload));
    }
}
