import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as WorkflowEspecieProcessoEditActions from '../actions/index';
import * as WorkflowEspecieProcessoListActions  from '../../../especies-processo-list/store/actions/index';
import {AddData, SetData} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema, workflow as workflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {EspecieProcesso} from '@cdk/models';

@Injectable()
export class EspeciesProcessoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieProcessoService: EspecieProcessoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get EspecieProcesso with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<WorkflowEspecieProcessoEditActions.GetEspecieProcesso>(WorkflowEspecieProcessoEditActions.GET_ESPECIE_PROCESSO),
                switchMap(action => this._especieProcessoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<EspecieProcesso>({data: response['entities'], schema: especieProcessoSchema}),
                    new WorkflowEspecieProcessoEditActions.GetEspecieProcessoSuccess({
                        loaded: {
                            id: 'especieProcessoHandle',
                            value: this.routerState.params.especieProcessoHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new WorkflowEspecieProcessoEditActions.GetEspecieProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Update EspecieProcesso
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<WorkflowEspecieProcessoEditActions.UpdateEspecieProcesso>(WorkflowEspecieProcessoEditActions.UPDATE_ESPECIE_PROCESSO),
                switchMap(action => this._especieProcessoService.patch(action.payload.especieProcesso, action.payload.changes).pipe(
                        mergeMap((response: EspecieProcesso) => [
                            new SetData<EspecieProcesso>({data: [response], schema: especieProcessoSchema}),
                            new WorkflowEspecieProcessoListActions.GetEspecieProcesso(
                                {
                                    filter: {
                                        'workflow.id': 'eq:' + this.routerState.params.workflowHandle
                                    },
                                    gridFilter: {},
                                    limit: 10,
                                    offset: 0,
                                    sort: {criadoEm: 'ASC'},
                                    populate: [
                                        'populateAll'
                                    ],
                                    context: {isAdmin: true},
                                    deletingIds: [],
                                    deletedIds: []
                                }
                            ),
                            new WorkflowEspecieProcessoEditActions.UpdateEspecieProcessoSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    this._store.dispatch(new WorkflowEspecieProcessoEditActions.UpdateEspecieProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieProcesso Success
     */
    @Effect({dispatch: false})
    updateEspecieProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<WorkflowEspecieProcessoEditActions.UpdateEspecieProcessoSuccess>(WorkflowEspecieProcessoEditActions.UPDATE_ESPECIE_PROCESSO_SUCCESS),
                tap((action) => {
                    this._router.navigate([this._router.url.replace('editar/criar', 'listar')]).then();
                })
            );

}
