import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoActions from '../actions/processo.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';

@Injectable()
export class ProcessoEffect {
    routerState: any;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetProcessoExistente>(ProcessoActions.GET_PROCESSO_EXISTENTE),
        switchMap(action => this._processoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Processo>({data: response['entities'], schema: processoSchema}),
            new ProcessoActions.GetProcessoExistenteSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                processoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetProcessoExistenteFailed(err));
        })
    ));
    /**
     * Get Visibilidades with router parameters
     *
     * @type {Observable<any>}
     */
    getVisibilidades: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetVisibilidades>(ProcessoActions.GET_VISIBILIDADES_PROCESSO_TAREFA),
        switchMap(action => this._processoService.getVisibilidade(action.payload)),
        tap((action) => {
            if (action[0].label !== 'TODOS OS USUÁRIOS') {
                action.restricaoProcesso = true;
            } else {
                action.restricaoProcesso = false;
            }
        }),
        mergeMap(response => [
            new ProcessoActions.GetVisibilidadesSuccess({
                restricaoProcesso: response.restricaoProcesso
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetVisibilidadesFailed(err));
        })
    ));


    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
