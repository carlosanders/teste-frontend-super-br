import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import * as EsqueciSenhaActions from '../actions/esqueci-senha.actions';
import {EsqueciSenhaService} from '../../esqueci-senha.service';

@Injectable()
export class EsqueciSenhaEffects {

    constructor(
        private actions: Actions,
        private esqueciSenhaService: EsqueciSenhaService,
        private router: Router
    ) {
    }

    @Effect()
    EsqueciSenha: Observable<EsqueciSenhaActions.EsqueciSenhaActionsAll> =
        this.actions
            .pipe(
                ofType<EsqueciSenhaActions.EsqueciSenha>(EsqueciSenhaActions.ESQUECI_SENHA),
                switchMap((action) => {
                        return this.esqueciSenhaService.esqueciSenha(action.payload.username, action.payload.email)
                            .pipe(
                                map((data) => {
                                    return new EsqueciSenhaActions.EsqueciSenhaSuccess(data);
                                }),
                                catchError((error) => {
                                    let msg = 'Sistema indisponível, tente mais tarde!';
                                    if (error && error.status && error.status === 404) {
                                        msg = 'Dados incorretos!';
                                    }
                                    return of(new EsqueciSenhaActions.EsqueciSenhaFailure({error: msg}));
                                })
                            );
                    }
                ));

    @Effect({dispatch: false})
    EsqueciSenhaSuccess: any =
        this.actions.pipe(
            ofType(EsqueciSenhaActions.ESQUECI_SENHA_SUCCESS)
        );

    @Effect({dispatch: false})
    EsqueciSenhaFailure: Observable<any> = this.actions.pipe(
        ofType(EsqueciSenhaActions.ESQUECI_SENHA_FAILURE)
    );

}
