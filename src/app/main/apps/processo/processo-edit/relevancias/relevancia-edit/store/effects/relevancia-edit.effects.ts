import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as RelevanciaEditActions from '../actions/relevancia-edit.actions';
import * as RelevanciaListActions from '../../../relevancia-list/store/actions/relevancia-list.actions';

import {RelevanciaService} from '@cdk/services/relevancia.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {relevancia as relevanciaSchema} from '@cdk/normalizr/relevancia.schema';
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
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Relevancia with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRelevancia: any =
        this._actions
            .pipe(
                ofType<RelevanciaEditActions.GetRelevancia>(RelevanciaEditActions.GET_RELEVANCIA),
                switchMap((action) => {
                    return this._relevanciaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
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
     * @type {Observable<any>}
     */
    @Effect()
    saveRelevancia: any =
        this._actions
            .pipe(
                ofType<RelevanciaEditActions.SaveRelevancia>(RelevanciaEditActions.SAVE_RELEVANCIA),
                switchMap((action) => {
                    return this._relevanciaService.save(action.payload).pipe(
                        mergeMap((response: Relevancia) => [
                            new RelevanciaEditActions.SaveRelevanciaSuccess(),
                            new RelevanciaListActions.ReloadRelevancias(),
                            new AddData<Relevancia>({data: [response], schema: relevanciaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'relevancia',
                                content: `Relevancia id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new RelevanciaEditActions.SaveRelevanciaFailed(err));
                        })
                    );
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
