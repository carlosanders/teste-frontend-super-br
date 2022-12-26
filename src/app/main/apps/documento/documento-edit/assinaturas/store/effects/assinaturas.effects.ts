import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaActions from 'app/store/actions/assinatura.actions';
import * as fromStore from '../index';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Assinatura} from '@cdk/models';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';

@Injectable()
export class AssinaturasEffects {

    routerState: any;
    /**
     * Get Assinatura with router parameters
     *
     * @type {Observable<any>}
     */
    getAssinatura: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetAssinatura>(fromStore.GET_ASSINATURA_DOCUMENTO),
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
            new fromStore.GetAssinaturaSuccess({
                loaded: {
                    id: 'assinaturaHandle',
                    value: response['entities'][0].id
                },
                assinaturaId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new fromStore.GetAssinaturaFailed(err));
        })
    ));
    /**
     * Get Assinaturas with router parameters
     *
     * @type {Observable<any>}
     */
    getAssinaturas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetAssinaturas>(fromStore.GET_ASSINATURAS_DOCUMENTO),
        switchMap((action) => {

            const params = {
                filter: action.payload.filter ? action.payload.filter : {
                    'componenteDigital.id': 'eq:' + action.payload
                },
                limit: action.payload.limit ? action.payload.limit : 5,
                offset: action.payload.offset ? action.payload.offset : 0,
                sort: action.payload.sort ? action.payload.sort : {criadoEm: 'DESC'},
                populate: action.payload.populate ? action.payload.populate : ['populateAll']
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
            new fromStore.GetAssinaturasSuccess({
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
            return of(new fromStore.GetAssinaturasFailed(err));
        })
    ));
    /**
     * Delete Assinatura
     *
     * @type {Observable<any>}
     */
    deleteAssinatura: Observable<fromStore.AssinaturaActionsAll> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeleteAssinatura>(fromStore.DELETE_ASSINATURA_DOCUMENTO),
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
                return new fromStore.DeleteAssinaturaSuccess({assinaturaId: response.id, documentoId: action.payload.documentoId});
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
                return of(new fromStore.DeleteAssinaturaFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Assinatura
     *
     * @type {Observable<any>}
     */
    saveAssinatura: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveAssinaturaDocumento>(fromStore.SAVE_ASSINATURA_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Salvando assinatura ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' criada com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Assinatura) => [
                new fromStore.SaveAssinaturaDocumentoSuccess(),
                new fromStore.GetAssinaturas(action.payload.documentoId),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Erro ao criar a assinatura!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new fromStore.SaveAssinaturaDocumentoFailed(err));
            })
        ))
    ));

    /**
     * Ações relacionadas a assinatura de minutas com sucesso
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetAssinaturas({
                filter: {
                    'componenteDigital.id': 'eq:' + this.routerState.params.componenteDigitalHandle
                },
                sort: {},
                limit: 10,
                offset: 0,
                populate: []
            }));
        })
    ), {dispatch: false});
    /**
     * Ações referentes a sucesso na assinatura eletrônica de componente digital
     */
    assinaDocumentoEletronicamenteSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoEletronicamenteSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetAssinaturas({
                filter: {
                    'componenteDigital.id': 'eq:' + this.routerState.params.componenteDigitalHandle
                },
                sort: {},
                limit: 10,
                offset: 0,
                populate: []
            }));
        })
    ), {dispatch: false});

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
