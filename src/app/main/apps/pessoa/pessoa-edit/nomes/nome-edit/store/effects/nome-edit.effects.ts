import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as NomeEditActions from '../actions/nome-edit.actions';
import * as NomeListActions from '../../../nome-list/store/actions/nome-list.actions';

import {NomeService} from '@cdk/services/nome.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {nome as nomeSchema} from '@cdk/normalizr/nome.schema';
import {Nome} from '@cdk/models/nome.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class NomeEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _nomeService: NomeService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Nome with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getNome: any =
        this._actions
            .pipe(
                ofType<NomeEditActions.GetNome>(NomeEditActions.GET_NOME),
                switchMap((action) => {
                    return this._nomeService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Nome>({data: response['entities'], schema: nomeSchema}),
                    new NomeEditActions.GetNomeSuccess({
                        loaded: {
                            id: 'nomeHandle',
                            value: this.routerState.params.nomeHandle
                        },
                        nomeId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new NomeEditActions.GetNomeFailed(err));
                    return caught;
                })
            );

    /**
     * Save Nome
     * @type {Observable<any>}
     */
    @Effect()
    saveNome: any =
        this._actions
            .pipe(
                ofType<NomeEditActions.SaveNome>(NomeEditActions.SAVE_NOME),
                switchMap((action) => {
                    return this._nomeService.save(action.payload).pipe(
                        mergeMap((response: Nome) => [
                            new NomeEditActions.SaveNomeSuccess(),
                            new NomeListActions.ReloadNomes(),
                            new AddData<Nome>({data: [response], schema: nomeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'nome',
                                content: `Nome id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new NomeEditActions.SaveNomeFailed(err));
                        })
                    );
                })
            );
    /**
     * Save Nome Success
     */
    @Effect({dispatch: false})
    saveNomeSuccess: any =
        this._actions
            .pipe(
                ofType<NomeEditActions.SaveNomeSuccess>(NomeEditActions.SAVE_NOME_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.nomeHandle), 'listar')]).then();
                })
            );
}