import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';
import * as fromStore from 'app/main/auth/login/store';
import * as AssinaturaStore from 'app/store';
import {getLoginAppState} from 'app/main/auth/login/store';
import {getRouterState} from '../../../store';
import {getConfig, getErrorMessage, getLoadingConfig} from './store';
import {LoginService} from './login.service';
import {filter} from 'rxjs/operators';
import packageInfo from '../../../../../package.json';
import * as LoginActions from './store/actions/login.actions';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
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
    routerState: any;

    config$: Observable<any>;

    config: any;

    version: string = packageInfo.version;

    versionChanged$: Observable<string>;

    /**
     *
     * @param cdkConfigService
     * @param store
     * @param _changeDetectorRef
     * @param _dialog
     * @param _router
     * @param _loginService
     */
    constructor(
        private cdkConfigService: CdkConfigService,
        private store: Store<fromStore.LoginState>,
        private _changeDetectorRef: ChangeDetectorRef,
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

        this.store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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
        ).subscribe((versionChanged) => {
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

        if (this.routerState.queryParams['code'] && this.routerState.queryParams['state']) {
            this.store.dispatch(new AssinaturaStore.RevalidaLoginGovBR({
                code: this.routerState.queryParams['code'],
                redirect: true,
                state: this.routerState.queryParams['state']
            }));
        // Retorno login govBR
        } else if (this.routerState.queryParams['code']) {
            this.store.dispatch(new fromStore.LoginGovBR({
                code: this.routerState.queryParams['code'],
                redirect: true
            }));
        } else {
            this.store.dispatch(new fromStore.Unload());
        }

        this.loading$.next(false);

        this.getLoginState.subscribe(() => {
            this.loading$.next(false);
        });

        this.config$.pipe(
            filter(config => !!config)
        ).subscribe((config) => {
            this.config = config;

            window.document.title = config.sigla;
            this.initFavicon(config);

            this.cdkConfigService.logo = config.logo;
            this.cdkConfigService.icone = config.icone;
            this.cdkConfigService.nome = config.name;
            this.cdkConfigService.sigla = config.sigla;
            this.cdkConfigService.barramento = config.barramento;
            this.cdkConfigService.govBR = config.govBR;
            this.cdkConfigService.assinadorVersion = config.assinador;
            this.cdkConfigService.email = config.email;
            this.cdkConfigService.ldap = config.ldap;
            localStorage.setItem('barramento', config.barramento);
            localStorage.setItem('assinadorVersion', config.assinador);
            localStorage.setItem('govBR', JSON.stringify(config.govBR));
        });

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

        // BC
        if (!['interno','ldap','govBr'].includes(this._loginService.getLoginType())) {
            this._loginService.setLoginType('interno');
        }
    }

    private initFavicon(config: any) {
        if (config.sigla && config.sigla !== 'SUPP' && config.sigla !== 'SAPIENS') {
            document.querySelector("link[rel=icon]")['href'] = "assets/icons/favicon-alt.ico";
        }
    }

    reloadConfig(): void {
        this.store.dispatch(new fromStore.GetConfig());
    }

    onSubmit(values): void {
        this.loading$.next(true);
        if (values.tipoLogin !== 'ldap') {
            this.onSubmitInterno(values);
        } else {
            this.onSubmitLdap(values);
        }
    }

    onSubmitInterno(values): void {
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
