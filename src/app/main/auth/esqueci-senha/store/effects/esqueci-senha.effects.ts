import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as EsqueciSenhaActions from '../actions/esqueci-senha.actions';
import {EsqueciSenhaService} from '../../esqueci-senha.service';

@Injectable()
export class EsqueciSenhaEffects {

    esqueciSenha: Observable<EsqueciSenhaActions.EsqueciSenhaActionsAll> = createEffect(() => this._actions.pipe(
        ofType<EsqueciSenhaActions.EsqueciSenha>(EsqueciSenhaActions.ESQUECI_SENHA),
        switchMap(action => this._esqueciSenhaService.esqueciSenha(action.payload.username, action.payload.email)
            .pipe(
                map(data => new EsqueciSenhaActions.EsqueciSenhaSuccess(data)),
                catchError((error) => {
                    let msg = 'Sistema indisponível, tente mais tarde!';
                    if (error && error.status && error.status === 404) {
                        msg = 'Dados incorretos!';
                    }
                    return of(new EsqueciSenhaActions.EsqueciSenhaFailure({error: msg}));
                })
            )
        )
    ));
    constructor(
        private _actions: Actions,
        private _esqueciSenhaService: EsqueciSenhaService,
        private _router: Router
    ) {
    }

}
