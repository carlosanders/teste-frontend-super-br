import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as LoginActions from '../actions/login.actions';
import {LoginService} from '../../login.service';
import {getConfig} from '../selectors';
import {select, Store} from '@ngrx/store';
import {State} from 'app/store';

@Injectable()
export class LoginEffects {

    login: Observable<LoginActions.LoginActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.Login>(LoginActions.LOGIN),
        withLatestFrom(this._store.pipe(select(getConfig))),
        switchMap(([action, config]) => this.loginService.login(action.payload.username, action.payload.password)
            .pipe(
                map((data: any) => {
                    // eslint-disable-next-line max-len
                    if (data?.passwordExpired) {
                        return new LoginActions.PasswordExpired(data.token);
                    }

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
        )
    ));

    loginLdap: Observable<LoginActions.LoginActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.LoginLdap>(LoginActions.LOGIN_LDAP),
        withLatestFrom(this._store.pipe(select(getConfig))),
        switchMap(([action, config]) => this.loginService.loginLdap(action.payload.username, action.payload.password)
            .pipe(
                map((data: any) => {
                    // eslint-disable-next-line max-len
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
        )
    ));

    loginGovBr: Observable<LoginActions.LoginActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.LoginGovBR>(LoginActions.LOGIN_GOV_BR),
        withLatestFrom(this._store.pipe(select(getConfig))),
        switchMap(([action, config]) => this.loginService.loginGovBr(action.payload.code)
            .pipe(
                map((data: any) => {
                    // eslint-disable-next-line max-len
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
                    return of(new LoginActions.LoginGovBrFailure({error: msg}));
                })
            )
        )
    ));

    loginRefreshToken: Observable<LoginActions.LoginActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.LoginRefreshToken>(LoginActions.LOGIN_REFRESH_TOKEN),
        withLatestFrom(this._store.pipe(select(getConfig))),
        switchMap(([action, config]) => this.loginService.refreshToken()
            .pipe(
                map((data) => {
                    // eslint-disable-next-line max-len
                    if ((!this.loginService.getVersion() && data.version === config.version) || (this.loginService.getVersion() && this.loginService.getVersion() === data.version)) {
                        return new LoginActions.LoginRefreshTokenSuccess(data);
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
        )
    ));

    loginSuccess: Observable<LoginActions.LoginProfile> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.LoginSuccess>(LoginActions.LOGIN_SUCCESS),
        map((action) => {
            this.loginService.setToken(action);
            return new LoginActions.LoginProfile({redirect: action.payload.redirect});
        })
    ));

    loginRefreshTokenSuccess: Observable<LoginActions.LoginProfile> = createEffect(() => this._actions.pipe(
        ofType(LoginActions.LOGIN_REFRESH_TOKEN_SUCCESS),
        map((action) => {
            this.loginService.setToken(action);
            return new LoginActions.LoginProfile({redirect: false});
        })
    ));

    loginFailure: Observable<any> = createEffect(() => this._actions.pipe(
        ofType(LoginActions.LOGIN_FAILURE)
    ), {dispatch: false});

    loginGovBrFailure: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.LoginGovBrFailure>(LoginActions.LOGIN_GOV_BR_FAILURE),
        tap((action) => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            let url = '';
            if (action.payload?.url && action.payload?.url.indexOf('/apps') > -1) {
                url = '?url=' + action.payload.url;
            }
            this.router.navigateByUrl('/auth/login' + url).then(() => {});
        })
    ), {dispatch: false});

    loginRefreshTokenFailure: Observable<any> = createEffect(() => this._actions.pipe(
        ofType(LoginActions.LOGIN_REFRESH_TOKEN_FAILURE)
    ), {dispatch: false});

    public logout: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.Logout>(LoginActions.LOGOUT),
        tap((action) => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            let url = '';
            if (action.payload?.url && action.payload?.url.indexOf('/apps') > -1) {
                url = '?url=' + action.payload.url;
            }
            this.router.navigateByUrl('/auth/login' + url).then(() => {
                this.loginService.removeToken();
                this.loginService.removeUserProfile();
                window.location.reload();
            });
        })
    ), {dispatch: false});

    public unload: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.Unload>(LoginActions.UNLOAD),
        tap(() => {
            this.loginService.removeToken();
            this.loginService.removeUserProfile();
            this.loginService.removeTimeout();
        })
    ), {dispatch: false});

    loginProfile: Observable<LoginActions.LoginActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.Login>(LoginActions.LOGIN_PROFILE),
        switchMap(action => this.loginService.getProfile()
            .pipe(
                map(response => new LoginActions.LoginProfileSuccess({
                    profile: response,
                    redirect: action.payload.redirect
                })),
                catchError(error => of(new LoginActions.LoginProfileFailure({error: error})))
            )
        )
    ));

    getConfig: Observable<LoginActions.LoginActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.GetConfig>(LoginActions.GET_CONFIG),
        switchMap(() => this.loginService.getConfig()
            .pipe(
                map(response => new LoginActions.GetConfigSuccess(response)),
                catchError(error => of(new LoginActions.GetConfigFailure({error: error})))
            )
        )
    ));

    loginProfileFailure: Observable<any> = createEffect(() => this._actions.pipe(
        ofType(LoginActions.LOGIN_PROFILE_FAILURE)
    ), {dispatch: false});

    loginProfileSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.LoginProfileSuccess>(LoginActions.LOGIN_PROFILE_SUCCESS),
        tap((action) => {
            this.loginService.setUserProfile(action.payload.profile);
            if (action.payload.redirect) {
                const url = this.route.snapshot.queryParamMap.get('url');
                this.router.navigateByUrl((url && url.indexOf('/apps') > -1) ? url : '/apps/painel').then();
            }
        })
    ), {dispatch: false});

    passwordExpired: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LoginActions.LoginProfileSuccess>(LoginActions.PASSWORD_EXPIRED),
        tap(() => {
            const url = this.route.snapshot.queryParamMap.get('url');
            this.router.navigateByUrl((url && url.indexOf('/apps') > -1) ? url : '/auth/update-password').then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private loginService: LoginService,
        private _store: Store<State>,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }
}
