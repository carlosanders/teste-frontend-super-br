import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as LoginActions from '../actions/login.actions';
import {LoginService} from '../../login.service';
import {getConfig} from '../selectors';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../store';

@Injectable()
export class LoginEffects {

    constructor(
        private actions: Actions,
        private loginService: LoginService,
        private _store: Store<State>,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    @Effect()
    Login: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.Login>(LoginActions.LOGIN),
                withLatestFrom(this._store.pipe(select(getConfig))),
                switchMap(([action, config]) => this.loginService.login(action.payload.username, action.payload.password)
                    .pipe(
                        map((data: any) => {
                            if ((!this.loginService.getVersion() && data.version === config.version) || (this.loginService.getVersion() && this.loginService.getVersion() === data.version)) {
                                data.redirect = action.payload.redirect ?? true;
                                return new LoginActions.LoginSuccess(data);
                            }
                            return new LoginActions.VersionChanged(data.version);
                        }),
                        catchError((error) => {
                            let msg = 'Sistema indisponível, tente mais tarde!';
                            if (error && error.error && error.error.code && error.error.code === 401) {
                                msg = error.error.message;
                            }
                            return of(new LoginActions.LoginFailure({error: msg}));
                        })
                    )
                ));

    @Effect()
    LoginLdap: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.LoginLdap>(LoginActions.LOGIN_LDAP),
                withLatestFrom(this._store.pipe(select(getConfig))),
                switchMap(([action, config]) => this.loginService.loginLdap(action.payload.username, action.payload.password)
                    .pipe(
                        map((data: any) => {
                            if ((!this.loginService.getVersion() && data.version === config.version) || (this.loginService.getVersion() && this.loginService.getVersion() === data.version)) {
                                data.redirect = action.payload.redirect ?? true;
                                return new LoginActions.LoginSuccess(data);
                            }
                            return new LoginActions.VersionChanged(data.version);
                        }),
                        catchError((error) => {
                            console.log(error);

                            let msg = 'Sistema indisponível, tente mais tarde!';
                            if (error && error.error && error.error.code && error.error.code === 401) {
                                msg = 'Dados incorretos!';
                            }
                            return of(new LoginActions.LoginFailure({error: msg}));
                        })
                    )
                ));

    @Effect()
    LoginGovBr: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.LoginGovBR>(LoginActions.LOGIN_GOV_BR),
                withLatestFrom(this._store.pipe(select(getConfig))),
                switchMap(([action, config]) => this.loginService.loginGovBr(action.payload.code)
                    .pipe(
                        map((data: any) => {
                            if ((!this.loginService.getVersion() && data.version === config.version) || (this.loginService.getVersion() && this.loginService.getVersion() === data.version)) {
                                data.redirect = action.payload.redirect ?? true;
                                return new LoginActions.LoginSuccess(data);
                            }
                            return new LoginActions.VersionChanged(data.version);
                        }),
                        catchError((error) => {
                            let msg = 'Sistema indisponível, tente mais tarde!';
                            if (error && error.error && error.error.code && error.error.code === 401) {
                                msg = 'Dados incorretos!';
                            }
                            return of(new LoginActions.LoginFailure({error: msg}));
                        })
                    )
                ));

    @Effect()
    LoginRefreshToken: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.LoginRefreshToken>(LoginActions.LOGIN_REFRESH_TOKEN),
                withLatestFrom(this._store.pipe(select(getConfig))),
                switchMap(([action, config]) => this.loginService.refreshToken()
                    .pipe(
                        map(data => {
                            if ((!this.loginService.getVersion() && data.version === config.version) || (this.loginService.getVersion() && this.loginService.getVersion() === data.version)) {
                                new LoginActions.LoginRefreshTokenSuccess(data);
                            }
                            return new LoginActions.VersionChanged(data.version);
                        }),
                        catchError((error) => {
                            let msg = 'Token inválido, realize autenticação novamente!';
                            if (error && error.status && error.status === 401) {
                                msg = 'O Token de autenticação está expirado!';
                            }
                            return of(new LoginActions.LoginRefreshTokenFailure({error: msg}));
                        })
                    )
                ));

    @Effect()
    LoginSuccess: Observable<LoginActions.LoginProfile> =
        this.actions.pipe(
            ofType<LoginActions.LoginSuccess>(LoginActions.LOGIN_SUCCESS),
            map((action) => {
                this.loginService.setToken(action);
                return new LoginActions.LoginProfile({redirect: action.payload.redirect});
            })
        );

    @Effect()
    LoginRefreshTokenSuccess: Observable<LoginActions.LoginProfile> =
        this.actions.pipe(
            ofType(LoginActions.LOGIN_REFRESH_TOKEN_SUCCESS),
            map((action) => {
                this.loginService.setToken(action);
                return new LoginActions.LoginProfile({redirect: false});
            })
        );

    @Effect({dispatch: false})
    LoginFailure: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_FAILURE)
    );

    @Effect({dispatch: false})
    LoginRefreshTokenFailure: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_REFRESH_TOKEN_FAILURE)
    );

    @Effect({dispatch: false})
    public Logout: Observable<any> = this.actions.pipe(
        ofType<LoginActions.Logout>(LoginActions.LOGOUT),
        tap((action) => {
            this.loginService.removeToken();
            this.loginService.removeUserProfile();
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            let url = '';
            if (action.payload?.url && action.payload?.url.indexOf('/apps') > -1) {
                url = '?url=' + action.payload.url;
            }
            this.router.navigateByUrl('/auth/login' + url).then(() => {
                window.location.reload();
            });
        })
    );

    @Effect({dispatch: false})
    public Unload: Observable<any> = this.actions.pipe(
        ofType<LoginActions.Unload>(LoginActions.UNLOAD),
        tap(() => {
            this.loginService.removeToken();
            this.loginService.removeUserProfile();
            this.loginService.removeTimeout();
        })
    );

    @Effect()
    LoginProfile: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.Login>(LoginActions.LOGIN_PROFILE),
                switchMap(action => this.loginService.getProfile()
                    .pipe(
                        map(response => new LoginActions.LoginProfileSuccess({
                            profile: response,
                            redirect: action.payload.redirect
                        })),
                        catchError(error => of(new LoginActions.LoginProfileFailure({error: error})))
                    )
                ));

    @Effect()
    GetConfig: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.GetConfig>(LoginActions.GET_CONFIG),
                switchMap(action => this.loginService.getConfig()
                    .pipe(
                        map(response => new LoginActions.GetConfigSuccess(response)),
                        catchError(error => of(new LoginActions.GetConfigFailure({error: error})))
                    )
                ));

    @Effect({dispatch: false})
    LoginProfileFailure: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_PROFILE_FAILURE)
    );

    @Effect({dispatch: false})
    LoginProfileSuccess: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_PROFILE_SUCCESS),
        tap((action) => {
            this.loginService.setUserProfile(action.payload.profile);
            if (action.payload.redirect) {
                const url = this.route.snapshot.queryParamMap.get('url');
                this.router.navigateByUrl((url && url.indexOf('/apps') > -1) ? url : '/apps/painel').then();
            }
        })
    );
}
