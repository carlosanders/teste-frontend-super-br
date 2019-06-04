import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import * as LoginActions from '../actions/login.actions';
import { LoginService } from '../../login.service';

@Injectable()
export class LoginEffects {

    constructor(
        private actions: Actions,
        private loginService: LoginService,
        private router: Router
    ) {}

    @Effect()
    Login: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.Login>(LoginActions.LOGIN),
                switchMap((action) => {
                    return this.loginService.login(action.payload.username, action.payload.password)
                        .map((data) => {
                            return new LoginActions.LoginSuccess({token: data.token});
                        })
                        .catch((error) => {
                            return of(new LoginActions.LoginFailure({ error: error }));
                        });
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

    @Effect({ dispatch: false })
    LoginFailure: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_FAILURE)
    );

    @Effect({ dispatch: false })
    public Logout: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGOUT),
        tap(() => {
            this.loginService.removeToken();
            location.reload(true);
        })
    );

    @Effect()
    LoginProfile: Observable<LoginActions.LoginActionsAll> =
        this.actions
            .pipe(
                ofType<LoginActions.Login>(LoginActions.LOGIN_PROFILE),
                switchMap((action) => {
                    return this.loginService.getProfile()
                        .map((data) => {
                            return new LoginActions.LoginProfileSuccess({profile: data.entities[0]});
                        })
                        .catch((error) => {
                            return of(new LoginActions.LoginProfileFailure({ error: error }));
                        });
                    }
                ));

    @Effect({ dispatch: false })
    LoginProfileFailure: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_PROFILE_FAILURE)
    );

    @Effect({ dispatch: false })
    LoginProfileSuccess: Observable<any> = this.actions.pipe(
        ofType(LoginActions.LOGIN_PROFILE_SUCCESS),
        tap((action) => {
            this.loginService.setUserProfile(action.payload.profile);
            this.router.navigateByUrl('/apps/painel');
        })
    );
}
