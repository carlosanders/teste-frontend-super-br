import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RelevanciaEditActions from '../actions/relevancia-edit.actions';
import * as RelevanciaListActions from '../../../relevancia-list/store/actions/relevancia-list.actions';

import {RelevanciaService} from '@cdk/services/relevancia.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {relevancia as relevanciaSchema} from '@cdk/normalizr';
import {Relevancia} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RelevanciaEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _relevanciaService: RelevanciaService,
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
     * Get Relevancia with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getRelevancia: any =
        this._actions
            .pipe(
                ofType<RelevanciaEditActions.GetRelevancia>(RelevanciaEditActions.GET_RELEVANCIA),
                switchMap(action => this._relevanciaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Relevancia>({data: response['entities'], schema: relevanciaSchema}),
                    new RelevanciaEditActions.GetRelevanciaSuccess({
                        loaded: {
                            id: 'relevanciaHandle',
                            value: this.routerState.params.relevanciaHandle
                        },
                        relevanciaId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RelevanciaEditActions.GetRelevanciaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Relevancia
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveRelevancia: any =
        this._actions
            .pipe(
                ofType<RelevanciaEditActions.SaveRelevancia>(RelevanciaEditActions.SAVE_RELEVANCIA),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relevância',
                    content: 'Salvando a relevância ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._relevanciaService.save(action.payload.relevancia).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'relevância',
                                content: 'Relevância id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Relevancia) => [
                            new RelevanciaEditActions.SaveRelevanciaSuccess(),
                            new RelevanciaListActions.ReloadRelevancias(),
                            new AddData<Relevancia>({data: [response], schema: relevanciaSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'relevância',
                                content: 'Erro ao salvar a relevância!',
                                status: 2, // erro
                            }));
                            return of(new RelevanciaEditActions.SaveRelevanciaFailed(err));
                        })
                    )
                })
            );

    /**
     * Save Relevancia Success
     */
    @Effect({dispatch: false})
    saveRelevanciaSuccess: any =
        this._actions
            .pipe(
                ofType<RelevanciaEditActions.SaveRelevanciaSuccess>(RelevanciaEditActions.SAVE_RELEVANCIA_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.relevanciaHandle), 'listar')]).then();
                })
            );
}
