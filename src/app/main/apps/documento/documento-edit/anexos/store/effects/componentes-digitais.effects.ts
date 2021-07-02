import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

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

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>
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
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getComponentesDigitais: any =
        this._actions
            .pipe(
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
                    // new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                    new ComponenteDigitalActions.GetComponentesDigitaisSuccess({
                        entitiesId: response['entities'].map(componenteDigital => componenteDigital.id),
                        loaded: {
                            id: 'componenteDigitalHandle',
                            value: this.routerState.params.componenteDigitalHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new ComponenteDigitalActions.GetComponentesDigitaisFailed(err));
                    return caught;
                })

            );

    /**
     * Delete ComponenteDigital
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteComponenteDigital: Observable<ComponenteDigitalActions.ComponenteDigitalActionsAll> =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.DeleteComponenteDigital>(ComponenteDigitalActions.DELETE_COMPONENTE_DIGITAL),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'componenteDigital',
                        content: 'Apagando a componenteDigital id ' + action.payload.componenteDigitalId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._componenteDigitalService.destroy(action.payload.componenteDigitalId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'componenteDigital',
                                content: 'ComponenteDigital id ' + action.payload.componenteDigitalId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<ComponenteDigital>({
                                id: response.id,
                                schema: componenteDigitalSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new ComponenteDigitalActions.DeleteComponenteDigitalSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.componenteDigitalId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'componenteDigital',
                                content: 'Erro ao apagar a componenteDigital id ' + action.payload.componenteDigitalId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new ComponenteDigitalActions.DeleteComponenteDigitalFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
                switchMap(action => this._componenteDigitalService.save(action.payload).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                            new AddData<ComponenteDigital>({data: [{...action.payload, ...response}], schema: componenteDigitalSchema}),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new fromStore.GetDocumentosVinculados()
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                        })
                    ))
            );

    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    @Effect()
    downloadComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.DownloadComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL),
                switchMap(action => this._componenteDigitalService.download(action.payload.componenteDigitalId).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                                    componenteDigitalId: response.id,
                                    repositorioId: action.payload.repositorioId
                                }
                            ),
                            new UpdateData<ComponenteDigital>({id: response.id, schema: componenteDigitalSchema, changes: {conteudo: response.conteudo}})
                        ]),
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
                    return caught;
                })
            );

    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    @Effect()
    aprovarComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.ApproveComponenteDigital>(ComponenteDigitalActions.APPROVE_COMPONENTE_DIGITAL),
                switchMap((action) => {

                    const componenteDigital = new ComponenteDigital();
                    componenteDigital.documentoOrigem = action.payload.documentoOrigem;

                    return this._componenteDigitalService.aprovar(componenteDigital).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.ApproveComponenteDigitalSuccess(response),
                            new AddData<ComponenteDigital>({data: [{...action.payload, ...response}], schema: componenteDigitalSchema}),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new fromStore.GetDocumentosVinculados()
                        ]),
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                    return caught;
                })
            );
}
