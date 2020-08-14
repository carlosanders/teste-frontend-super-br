import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as TarefaEditActions from '../actions/tarefa-edit.actions';
import * as TarefaListActions from '../../../tarefa-list/store/actions/tarefa-list.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TarefaEditEffect {
    routerState: any;
    steps: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
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
     * Get Tarefa with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaEditActions.GetTarefa>(TarefaEditActions.GET_TAREFA),
                switchMap((action) => {
                    return this._tarefaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'processo',
                            'processo.especieProcesso',
                            'processo.especieProcesso.generoProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'especieTarefa',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'especieTarefa.generoTarefa'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                    new TarefaEditActions.GetTarefaSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        tarefaId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefaEditActions.GetTarefaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    saveTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaEditActions.SaveTarefa>(TarefaEditActions.SAVE_TAREFA),
                switchMap((action) => {
                    return this._tarefaService.save(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaEditActions.SaveTarefaSuccess(),
                            new TarefaListActions.ReloadTarefas(),
                            new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new TarefaEditActions.SaveTarefaFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Tarefa Success
     */
    @Effect({dispatch: false})
    saveTarefaSuccess: any =
        this._actions
            .pipe(
                ofType<TarefaEditActions.SaveTarefaSuccess>(TarefaEditActions.SAVE_TAREFA_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.tarefaHandle), 'listar')]).then();
                })
            );
}
