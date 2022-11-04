import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    componenteDigital as componenteDigitalSchema, documento as documentoSchema
} from '@cdk/normalizr';
import {ComponenteDigital} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {getDocumento} from "../selectors";
import {SetCurrentStep} from "../../../../store";

@Injectable()
export class ComponenteDigitalEffects {
    routerState: any;
    componenteDigitalId: number;
    lixeira = false;
    pesquisa = false;
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
                populate: ['criadoPor']
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
            new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
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
            content: 'Apagando o componente digital id ' + action.payload.componenteDigitalId + '...',
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
                this._store.dispatch(new RemoveChildData({
                    id: action.payload.componenteDigitalId,
                    childSchema: componenteDigitalSchema,
                    parentSchema: documentoSchema,
                    parentId: action.payload.documento.id
                }));
                this._store.dispatch(new AddData<ComponenteDigital>({
                    data: [response],
                    schema: componenteDigitalSchema
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
                    content: 'Erro ao apagar o componente digital id ' + action.payload.componenteDigitalId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ComponenteDigitalActions.DeleteComponenteDigitalFailed(payload));
            })
        ), 25)
    ));
    /**
     * Delete ComponenteDigital Success
     *
     * @type {Observable<any>}
     */
    deleteComponenteDigitalSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DeleteComponenteDigitalSuccess>(ComponenteDigitalActions.DELETE_COMPONENTE_DIGITAL_SUCCESS),
        withLatestFrom(this._store.pipe(select(getDocumento))),
        tap(([action, documento]) => {
            if (parseInt(this.routerState.params['componenteDigitalHandle'], 10) === action.payload) {
                let primary = '';
                let nextComponenteDigital = null;
                nextComponenteDigital = documento.componentesDigitais[0];
                if (nextComponenteDigital) {
                    primary = 'componente-digital/' + nextComponenteDigital.id;
                } else {
                    primary = undefined;
                }
                this._router.navigate(
                    [
                        this.routerState.url.split('/documento/')[0] + '/documento/' + documento.id,
                        {
                            outlets: {
                                primary: primary,
                                sidebar: 'editar/componentes-digitais'
                            }
                        }
                    ],
                    {
                        relativeTo: this._activatedRoute.parent,
                        queryParams: {
                            lixeira: this.lixeira ? true : null,
                            pesquisa: this.pesquisa ? true : null
                        }
                    }
                ).then(() => {
                    console.log('caiu no then');
                    if (nextComponenteDigital) {
                        this._store.dispatch(new SetCurrentStep({
                            id: nextComponenteDigital.id,
                            editavel: nextComponenteDigital.editavel && documento.minuta
                        }));
                    }
                });
            }
        })
    ), {dispatch: false});
    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    saveComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
        switchMap((action) => {
            const documentoId = action.payload.documento.id;
            const componenteDigital = new ComponenteDigital();
            Object.assign(componenteDigital, action.payload);
            componenteDigital.documento = undefined;
            componenteDigital.file = null;
            this._store.dispatch(new AddData<ComponenteDigital>({
                data: [componenteDigital],
                schema: componenteDigitalSchema
            }));
            this._store.dispatch(new AddChildData<ComponenteDigital>({
                data: [componenteDigital],
                childSchema: componenteDigitalSchema,
                parentSchema: documentoSchema,
                parentId: documentoId
            }));
            return of(new ComponenteDigitalActions.SaveComponenteDigitalSuccess(componenteDigital));
        }),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
        })
    ), {dispatch: false});
    /**
     * Patch ComponenteDigital
     *
     * @type {Observable<any>}
     */
    patchComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.PatchComponenteDigital>(ComponenteDigitalActions.PATCH_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: `Editando o componente digital id ${action.payload.componenteDigital.id}...`,
            status: 0, // carregando
        }))),
        switchMap(action => this._componenteDigitalService.patch(action.payload.componenteDigital, {
            conteudo: action.payload.componenteDigital.conteudo,
            hashAntigo: action.payload.componenteDigital.hash,
            numeracaoSequencial: action.payload.changes.numeracaoSequencial,
            fileName: action.payload.changes.fileName,
            softwareCriacao: action.payload.changes.softwareCriacao,
            versaoSoftwareCriacao: action.payload.changes.versaoSoftwareCriacao
        }).pipe(
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.PatchComponenteDigitalSuccess(response),
                new UpdateData<ComponenteDigital>({
                    id: response.id, schema: componenteDigitalSchema,
                    changes: {
                        numeracaoSequencial: response.numeracaoSequencial,
                        fileName: response.fileName,
                        softwareCriacao: response.softwareCriacao,
                        versaoSoftwareCriacao: response.versaoSoftwareCriacao
                    }
                }),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: `Componente Digital id ${response.id} editado com sucesso!`,
                    status: 1, // Sucesso
                }),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Erro ao alterar o componente digital!',
                    status: 2, // erro
                }));
                return of(new ComponenteDigitalActions.PatchComponenteDigitalFailed(err));
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
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    aprovarComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.ApproveComponenteDigital>(ComponenteDigitalActions.APPROVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Criando componente digital de aprovação...',
            status: 0, // carregando
        }))),
        switchMap((action) => {

            const componenteDigital = new ComponenteDigital();
            componenteDigital.documentoOrigem = action.payload.documentoOrigem;

            return this._componenteDigitalService.aprovar(componenteDigital).pipe(
                mergeMap((response: ComponenteDigital) => [
                    new ComponenteDigitalActions.ApproveComponenteDigitalSuccess(componenteDigital),
                    new AddData<ComponenteDigital>({
                        data: [{...action.payload, ...response}],
                        schema: componenteDigitalSchema
                    }),
                    new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'componente digital',
                        content: `Aprovação id ${response.id} criada com sucesso!`,
                        status: 1, // carregando
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'componente digital',
                        content: 'Erro ao criar componente digital de aprovação!',
                        status: 2, // erro
                    }));
                    return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                })
            );
        })
    ));
    /**
     * Get ComponenteDigital with router parameters
     *
     * @type {Observable<any>}
     */
    getComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetComponenteDigital>(ComponenteDigitalActions.GET_COMPONENTE_DIGITAL),
        switchMap(action => this._componenteDigitalService.query(JSON.stringify({
                id: 'eq:' + action.payload.componenteDigitalId
            }),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'conteudo',
                'hash'
            ]))),
        switchMap(response => [
            new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
            new ComponenteDigitalActions.GetComponenteDigitalSuccess({
                loaded: {
                    id: 'componenteDigitalHandle',
                    value: response['entities'][0].id
                },
                sigiloId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.GetComponenteDigitalFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.lixeira = !!routerState.state.queryParams.lixeira;
            this.pesquisa = !!routerState.state.queryParams.pesquisa;
        });
    }
}
