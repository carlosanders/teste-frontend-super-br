import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {ComponenteDigital} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../index';

@Injectable()
export class ComponenteDigitalEffects {
    routerState: any;
    componenteDigitalId: number;
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    getComponentesDigitais: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetComponentesDigitais>(ComponenteDigitalActions.GET_COMPONENTES_DIGITAIS),
        switchMap((action) => {

            const params = {
                filter: action.payload.filter ? action.payload.filter : {
                    'documento.id': 'eq:' + action.payload
                },
                limit: action.payload.limit ? action.payload.limit : 5,
                offset: action.payload.offset ? action.payload.offset : 0,
                sort: action.payload.sort ? action.payload.sort : {numeracaoSequencial: 'ASC'},
                populate: []
            };

            return this._componenteDigitalService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate));
        }),
        mergeMap(response => [
            new ComponenteDigitalActions.GetComponentesDigitaisSuccess({
                entitiesId: response['entities'].map(componenteDigital => componenteDigital.id),
                loaded: {
                    id: 'componenteDigitalHandle',
                    value: this.routerState.params.componenteDigitalHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.GetComponentesDigitaisFailed(err));
        })
    ));
    /**
     * Delete ComponenteDigital
     *
     * @type {Observable<any>}
     */
    deleteComponenteDigital: Observable<ComponenteDigitalActions.ComponenteDigitalActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DeleteComponenteDigital>(ComponenteDigitalActions.DELETE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Apagando componente digital id ' + action.payload.componenteDigitalId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._componenteDigitalService.destroy(action.payload.componenteDigitalId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Componente digital id ' + action.payload.componenteDigitalId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<ComponenteDigital>({
                    id: response.id,
                    schema: componenteDigitalSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new ComponenteDigitalActions.DeleteComponenteDigitalSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.componenteDigitalId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Erro ao apagar componente digital id ' + action.payload.componenteDigitalId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ComponenteDigitalActions.DeleteComponenteDigitalFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    saveComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Salvando componente digital ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'componente digital',
                content: 'Componente digital id ' + response.id + ' salvo com sucesso.',
                status: 1, // carregando
            }))),
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                new AddData<ComponenteDigital>({
                    data: [{...action.payload.componenteDigital, ...response}],
                    schema: componenteDigitalSchema
                }),
                new fromStore.ReloadDocumentosVinculados()
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Erro ao salvar componente digital!',
                    status: 2, // erro
                }));
                return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
            })
        ))
    ));
    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    downloadComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DownloadComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL),
        switchMap(action => this._componenteDigitalService.download(action.payload.componenteDigitalId).pipe(
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                        componenteDigitalId: response.id,
                        repositorioId: action.payload.repositorioId
                    }
                ),
                new UpdateData<ComponenteDigital>({
                    id: response.id,
                    schema: componenteDigitalSchema,
                    changes: {conteudo: response.conteudo}
                })
            ]),
        )),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
        })
    ));
    /**
     * AprovarComponenteDigital
     *
     * @type {Observable<any>}
     */
    aprovarComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.ApproveComponenteDigital>(ComponenteDigitalActions.APPROVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Criando componente digital de aprovação ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {

            const componenteDigital = new ComponenteDigital();
            componenteDigital.documentoOrigem = action.payload.documentoOrigem;

            return this._componenteDigitalService.aprovar(componenteDigital).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Componente digital de aprovação id ' + response.id + ' salvo com sucesso.',
                    status: 1, // carregando
                }))),
                mergeMap((response: ComponenteDigital) => [
                    new ComponenteDigitalActions.ApproveComponenteDigitalSuccess(response),
                    new AddData<ComponenteDigital>({
                        data: [{...action.payload, ...response}],
                        schema: componenteDigitalSchema
                    }),
                    new fromStore.ReloadDocumentosVinculados()
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'componente digital',
                        content: 'Erro ao salvar componente digital!',
                        status: 2, // erro
                    }));
                    return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                })
            );
        })
    ));

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
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
