import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import * as LoginActions from '../actions/login.actions';
import {LoginService} from '../../login.service';

@Injectable()
export class LoginEffects {

    constructor(
        private actions: Actions,
        private loginService: LoginService,
        private router: Router
    ) {
    }

    @Effect()
    Login: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.Login>(LoginActions.LOGIN),
                switchMap((action) => {
                        return this.loginService.login(action.payload.username, action.payload.password)
                            .pipe(
                                map((data) => {
                                    return new LoginActions.LoginSuccess({token: data.token});
                                }),
                                catchError((error) => {
                                    let msg = 'Sistema indisponível, tente mais tarde!';
                                    if (error && error.status && error.status === 401) {
                                        msg = 'Dados incorretos!';
                                    }
                                    return of(new LoginActions.LoginFailure({error: msg}));
                                })
                            );
                    }
                ));

    @Effect()
    LoginSuccess: Observable<LoginActions.LoginProfile> =
        this.actions.pipe(
            ofType(LoginActions.LOGIN_SUCCESS),
            map((action) => {
                this.loginService.setToken(action);
                return new LoginActions.LoginProfile();
            })
        );

    @Effect({dispatch: false})
    LoginFailure: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_FAILURE)
    );

    @Effect({dispatch: false})
    public Logout: Observable<any> = this.actions.pipe(
        ofType<LoginActions.Logout>(LoginActions.LOGOUT),
        tap(() => {
            this.loginService.removeToken();
            this.router.navigateByUrl('/auth/login').then();
        })
    );

    @Effect()
    LoginProfile: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.Login>(LoginActions.LOGIN_PROFILE),
                switchMap(() => {
                        return this.loginService.getProfile()
                            .pipe(
                                map((data) => {
                                    return new LoginActions.LoginProfileSuccess({profile: data.entities[0]});
                                }),
                                catchError((error) => {
                                    return of(new LoginActions.LoginProfileFailure({error: error}));
                                })
                            );
                    }
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
            this.router.navigateByUrl('/apps/painel').then();
        })
    );
}
