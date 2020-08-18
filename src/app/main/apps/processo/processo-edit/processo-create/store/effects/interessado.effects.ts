import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as InteressadoActions from '../actions/interessado.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Interessado} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {InteressadoService} from '@cdk/services/interessado.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {getInteressadosPagination} from '../selectors';

@Injectable()
export class InteressadosEffect {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _interessadoService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _interessadoService: InteressadoService,
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
     * Get Interessados Processo
     * @type {Observable<any>}
     */
    @Effect()
    getInteressadosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<InteressadoActions.GetInteressados>(InteressadoActions.GET_INTERESSADOS),
                switchMap((action) => {
                    return this._interessadoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context));
                }),
                mergeMap((response) => [
                    new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
                    new InteressadoActions.GetInteressadosSuccess({
                        entitiesId: response['entities'].map(interessado => interessado.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new InteressadoActions.GetInteressadosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Interessado
     * @type {Observable<any>}
     */
    @Effect()
    deleteInteressado: any =
        this._actions
            .pipe(
                ofType<InteressadoActions.DeleteInteressado>(InteressadoActions.DELETE_INTERESSADO),
                mergeMap((action) => {
                    return this._interessadoService.destroy(action.payload).pipe(
                        map((response) => new InteressadoActions.DeleteInteressadoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new InteressadoActions.DeleteInteressadoFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Interessado
     * @type {Observable<any>}
     */
    @Effect()
    saveInteressado: any =
        this._actions
            .pipe(
                ofType<InteressadoActions.SaveInteressado>(InteressadoActions.SAVE_INTERESSADO),
                switchMap((action) => {
                    return this._interessadoService.save(action.payload).pipe(
                        mergeMap((response: Interessado) => [
                            new InteressadoActions.SaveInteressadoSuccess(),
                            new AddData<Interessado>({data: [response], schema: interessadoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'interessado',
                                content: `Interessado id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new InteressadoActions.SaveInteressadoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Interessado Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    saveInteressadoSuccess: any =
        this._actions
            .pipe(
                ofType<InteressadoActions.SaveInteressadoSuccess>(InteressadoActions.SAVE_INTERESSADO_SUCCESS),
                withLatestFrom(this._store.pipe(select(getInteressadosPagination))),
                tap(([action, pagination]) => {
                    this._store.dispatch(new InteressadoActions.GetInteressados(pagination));
                }),
            );
}
