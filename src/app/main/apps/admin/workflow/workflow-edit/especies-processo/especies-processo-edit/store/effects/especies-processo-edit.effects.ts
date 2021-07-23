import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as WorkflowEspecieProcessoEditActions from '../actions';
import * as WorkflowEspecieProcessoListActions from '../../../especies-processo-list/store/actions';
import {AddData, SetData} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {EspecieProcesso} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie processo',
                    content: 'Alterando a espécie processo ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._especieProcessoService.patch(action.payload.especieProcesso, action.payload.changes).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'espécie processo',
                                content: 'Espécie processo id ' + response.id + ' alterado com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: EspecieProcesso) => [
                            new SetData<EspecieProcesso>({data: [response], schema: especieProcessoSchema}),
                            new WorkflowEspecieProcessoListActions.UnloadEspecieProcesso(),
                            new WorkflowEspecieProcessoEditActions.UpdateEspecieProcessoSuccess(response),
                            new AddData<EspecieProcesso>({data: [response], schema: especieProcessoSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'especieProcesso',
                                content: 'Erro ao alterar a espécie processo!',
                                status: 2, // erro
                            }));
                            return of(new WorkflowEspecieProcessoEditActions.UpdateEspecieProcessoFailed(err));
                        })
                    )
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
