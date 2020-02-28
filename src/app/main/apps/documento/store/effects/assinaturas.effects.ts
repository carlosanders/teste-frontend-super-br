import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaActions from '../actions/assinaturas.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Assinatura} from '@cdk/models';
import {assinatura as assinaturaSchema} from '@cdk/normalizr/assinatura.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {AssinaturaService} from '@cdk/services/assinatura.service';

@Injectable()
export class AssinaturaEffect {

    constructor(
        private _actions: Actions,
        private _assinaturaService: AssinaturaService,
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

    routerState: any;

    /**
     * Get Assinatura with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAssinatura: any =
        this._actions
            .pipe(
                ofType<AssinaturaActions.GetAssinatura>(AssinaturaActions.GET_ASSINATURA_DOCUMENTO),
                switchMap((action) => {
                    return this._assinaturaService.query(JSON.stringify({
                            id: 'eq:' + action.payload.assinaturaId
                        }),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Assinatura>({data: response['entities'], schema: assinaturaSchema}),
                    new AssinaturaActions.GetAssinaturaSuccess({
                        loaded: {
                            id: 'assinaturaHandle',
                            value: response['entities'][0].id
                        },
                        assinaturaId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssinaturaActions.GetAssinaturaFailed(err));
                    return caught;
                })
            );

    /**
     * Get Assinaturas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAssinaturas: any =
        this._actions
            .pipe(
                ofType<AssinaturaActions.GetAssinaturas>(AssinaturaActions.GET_ASSINATURAS_DOCUMENTO),
                switchMap((action) => {

                    const params = {
                        filter: action.payload.filter ? action.payload.filter : {
                            'componenteDigital.id': 'eq:' + action.payload
                        },
                        limit: action.payload.limit ? action.payload.limit : 5,
                        offset: action.payload.offset ? action.payload.offset : 0,
                        sort: action.payload.sort ? action.payload.sort : {criadoEm: 'DESC'},
                        populate: []
                    };

                    return this._assinaturaService.query(
                        JSON.stringify({
                            ...params.filter
                        }),
                        params.limit,
                        params.offset,
                        JSON.stringify(params.sort),
                        JSON.stringify(params.populate));
                }),
                mergeMap((response) => [
                    new AddData<Assinatura>({data: response['entities'], schema: assinaturaSchema}),
                    new AssinaturaActions.GetAssinaturasSuccess({
                        entitiesId: response['entities'].map(assinatura => assinatura.id),
                        loaded: {
                            id: 'componenteDigitalHandle',
                            value: this.routerState.params.componenteDigitalHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new AssinaturaActions.GetAssinaturasFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Assinatura
     * @type {Observable<any>}
     */
    @Effect()
    deleteAssinatura: any =
        this._actions
            .pipe(
                ofType<AssinaturaActions.DeleteAssinatura>(AssinaturaActions.DELETE_ASSINATURA_DOCUMENTO),
                mergeMap((action) => {
                    return this._assinaturaService.destroy(action.payload.assinaturaId).pipe(
                        map((response) => new AssinaturaActions.DeleteAssinaturaSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new AssinaturaActions.DeleteAssinaturaFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Assinatura
     * @type {Observable<any>}
     */
    @Effect()
    saveAssinatura: any =
        this._actions
            .pipe(
                ofType<AssinaturaActions.SaveAssinaturaDocumento>(AssinaturaActions.SAVE_ASSINATURA_DOCUMENTO),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura).pipe(
                        mergeMap((response: Assinatura) => [
                            new AssinaturaActions.SaveAssinaturaDocumentoSuccess(),
                            new AssinaturaActions.GetAssinaturas(action.payload.documentoId),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new AssinaturaActions.SaveAssinaturaDocumentoFailed(err));
                        })
                    );
                })
            );

}
