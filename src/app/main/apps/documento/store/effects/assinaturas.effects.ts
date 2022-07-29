import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaActions from '../actions/assinaturas.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Assinatura} from '@cdk/models';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';

@Injectable()
export class AssinaturaEffect {
    routerState: any;
    /**
     * Get Assinatura with router parameters
     *
     * @type {Observable<any>}
     */
    getAssinatura: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.GetAssinatura>(AssinaturaActions.GET_ASSINATURA_DOCUMENTO),
        switchMap(action => this._assinaturaService.query(JSON.stringify({
                id: 'eq:' + action.payload.assinaturaId
            }),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new AssinaturaActions.GetAssinaturaFailed(err));
        })
    ));
    /**
     * Get Assinaturas with router parameters
     *
     * @type {Observable<any>}
     */
    getAssinaturas: Observable<any> = createEffect(() => this._actions.pipe(
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
        mergeMap(response => [
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
        catchError((err) => {
            console.log(err);
            return of(new AssinaturaActions.GetAssinaturasFailed(err));
        })
    ));
    /**
     * Delete Assinatura
     *
     * @type {Observable<any>}
     */
    deleteAssinatura: Observable<AssinaturaActions.AssinaturaActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.DeleteAssinatura>(AssinaturaActions.DELETE_ASSINATURA_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Apagando a assinatura id ' + action.payload.assinaturaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._assinaturaService.destroy(action.payload.assinaturaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Assinatura id ' + action.payload.assinaturaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Assinatura>({
                    id: response.id,
                    schema: assinaturaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new AssinaturaActions.DeleteAssinaturaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.assinaturaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Erro ao apagar a assinatura id ' + action.payload.assinaturaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AssinaturaActions.DeleteAssinaturaFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Assinatura
     *
     * @type {Observable<any>}
     */
    saveAssinatura: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.SaveAssinaturaDocumento>(AssinaturaActions.SAVE_ASSINATURA_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Assinando documento ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Assinatura) => [
                new AssinaturaActions.SaveAssinaturaDocumentoSuccess(),
                new AssinaturaActions.GetAssinaturas(action.payload.documentoId),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Erro na assinatura de documento.',
                    status: 2, // carregando
                    lote: action.payload.loteId
                }));
                return of(new AssinaturaActions.SaveAssinaturaDocumentoFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _assinaturaService: AssinaturaService,
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
