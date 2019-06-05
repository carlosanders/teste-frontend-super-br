import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import * as ProfileActions from '../actions/perfil.actions';

import {ColaboradorService} from '@cdk/services/colaborador.service';
import {Colaborador} from '@cdk/models/colaborador.model';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ProfileEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Profile
     * @type {Observable<any>}
     */
    @Effect()
    saveProfile: any =
        this._actions
            .pipe(
                ofType<ProfileActions.SaveProfile>(ProfileActions.SAVE_PERFIL),
                switchMap((action) => {
                    return this._colaboradorService.save(action.payload).pipe(
                        mergeMap((response: Colaborador) => [
                            new ProfileActions.SaveProfileSuccess(),  new OperacoesActions.Resultado({
                                type: 'profile',
                                content: `Profile id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ProfileActions.SaveProfileFailed(err));
                        })
                    );
                })
            );
}
