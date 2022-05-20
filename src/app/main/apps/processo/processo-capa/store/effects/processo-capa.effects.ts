import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoCapaActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData, RemoveChildData} from '@cdk/ngrx-normalizr';
import {Assunto, Compartilhamento, Interessado, Juntada, Processo, Usuario, VinculacaoProcesso} from '@cdk/models';
import {
    assunto as assuntoSchema,
    compartilhamento as acompanhamentoSchema,
    interessado as interessadoSchema, juntada as juntadaSchema,
    processo as processoSchema,
    vinculacaoProcesso as vinculacaoProcessoSchema
} from '@cdk/normalizr';
import {AssuntoService} from '@cdk/services/assunto.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../index';
import {JuntadaService} from '@cdk/services/juntada.service';

@Injectable()
export class ProcessoCapaEffect {
    routerState: any;
    usuario: Usuario;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.GetProcesso>(ProcessoCapaActions.GET_PROCESSO),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};

            contexto['compartilhamentoUsuario'] = 'processo';

            this._store.dispatch(new ProcessoCapaActions.SetToggleAcompanhamento({
                loadingAcompanhamento: true
            }));

            return this._processoService.get(
                action.payload.id,
                JSON.stringify([
                    'populateAll',
                    'setorAtual.unidade',
                    'setorAtual.especieSetor',
                    'classificacao.modalidadeDestinacao',
                    'especieProcesso.vinculacoesEspecieProcessoWorkflow',
                    'especieProcesso.vinculacoesEspecieProcessoWorkflow.workflow',
                    'especieProcesso.generoProcesso'
                ]),
                JSON.stringify(contexto));
        }),
        mergeMap(response => [
            new AddData<Processo>({data: [response], schema: processoSchema}),
            new ProcessoCapaActions.GetProcessoSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params['processoHandle']
                },
                processoId: this.routerState.params['processoHandle'],
                loadingAcompanhamento: false
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoCapaActions.GetProcessoFailed(err));
        })
    ));
    /**
     * Get Processo Success
     */
    getProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.GetProcessoSuccess>(ProcessoCapaActions.GET_PROCESSO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.UnloadAssuntos({reset: true}));
            const paramsAssuntos = {
                filter: {'processo.id': `eq:${action.payload.processoId}`, 'principal': 'eq:true'},
                sort: {},
                limit: 10,
                offset: 0,
                populate: ['populateAll']
            };
            this._store.dispatch(new fromStore.GetAssuntos(paramsAssuntos));
            this._store.dispatch(new fromStore.UnloadInteressados({reset: true}));
            const paramsInteressados = {
                filter: {'processo.id': `eq:${action.payload.processoId}`},
                sort: {},
                limit: 10,
                offset: 0,
                populate: ['populateAll', 'pessoa']
            };
            this._store.dispatch(new fromStore.GetInteressados(paramsInteressados));
            this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
            const paramsJuntadas = {
                filter: {'volume.processo.id': `eq:${action.payload.processoId}`},
                sort: {numeracaoSequencial: 'DESC'},
                gridFilter: {},
                limit: 10,
                offset: 0,
                populate: [
                    'populateAll',
                    'documento',
                    'documento.componentesDigitais',
                    'documento.tipoDocumento',
                    'documento.vinculacoesDocumentos',
                    'documento.vinculacaoDocumentoPrincipal',
                    'documento.criadoPor',
                    'documento.origemDados',
                    'documento.setorOrigem',
                    'documento.setorOrigem.unidade',
                    'documento.pasta',
                    'documento.procedencia',
                    'documento.componentesDigitais.assinaturas',
                ]
            };
            this._store.dispatch(new fromStore.GetJuntadas(paramsJuntadas));
            this._store.dispatch(new fromStore.UnloadVinculacoesProcessos({reset: true}));
            const paramsVinculacoesProcessos = {
                processoId: action.payload.processoId,
                populate: ['populateAll']
            };
            this._store.dispatch(new fromStore.GetVinculacoesProcessos(paramsVinculacoesProcessos));

        })
    ), {dispatch: false});
    /**
     * Get Assuntos Processo
     *
     * @type {Observable<any>}
     */
    getAssuntosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.GetAssuntos>(ProcessoCapaActions.GET_ASSUNTOS),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            return this._assuntoService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.listFilter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(contexto));
        }),
        mergeMap(response => [
            new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
            new ProcessoCapaActions.GetAssuntosSuccess({
                entitiesId: response['entities'].map(assunto => assunto.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params['processoHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoCapaActions.GetAssuntosFailed(err));
        })
    ));
    /**
     * GetInteressados Processo
     *
     * @type {Observable<any>}
     */
    getInteressadosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.GetInteressados>(ProcessoCapaActions.GET_INTERESSADOS),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            return this._interessadoService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.listFilter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(contexto));
        }),
        mergeMap(response => [
            new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
            new ProcessoCapaActions.GetInteressadosSuccess({
                entitiesId: response['entities'].map(interessado => interessado.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params['processoHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoCapaActions.GetInteressadosFailed(err));
        })
    ));
    /**
     * GetVinculacoesProcessos Processo
     *
     * @type {Observable<any>}
     */
    getVinculacoesProcessosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.GetVinculacoesProcessos>(ProcessoCapaActions.GET_VINCULACOES_PROCESSOS),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            return this._vinculacaoProcessoService.findAllVinculacoes(
                action.payload.processoId,
                JSON.stringify(action.payload.populate),
                JSON.stringify(contexto)
            );
        }),
        mergeMap(response => [
            new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
            new ProcessoCapaActions.GetVinculacoesProcessosSuccess({//o-
                entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params['processoHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoCapaActions.GetVinculacoesProcessosFailed(err));
        })
    ));

    /**
     * Get Acompanhamento do Processo
     *
     * @type {Observable<any>}
     */
    getAcompanhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.GetAcompanhamento>(ProcessoCapaActions.GET_ACOMPANHAMENTO),
        switchMap(action => this._acompanhamentoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.listFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<Compartilhamento>({data: response['entities'], schema: acompanhamentoSchema}),
            new ProcessoCapaActions.GetAcompanhamentoSuccess({
                entitiesId: response['entities'].map(acompanhamento => acompanhamento.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params['processoHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoCapaActions.GetAcompanhamentoFailed(err));
        })
    ));
    /**
     * Save Acompanhamento
     *
     * @type {Observable<any>}
     */
    saveAcompanhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.SaveAcompanhamento>(ProcessoCapaActions.SAVE_ACOMPANHAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'acompanhamento',
            content: 'Salvando o acompanhamento ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const acompanhamento = new Compartilhamento();
            acompanhamento.usuario = this._loginService.getUserProfile();
            acompanhamento.processo = action.payload.processo;
            return this._acompanhamentoService.save(action.payload.acompanhamento).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'acompanhamento',
                    content: 'Acompanhamento id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Compartilhamento) => [
                    new ProcessoCapaActions.SaveAcompanhamentoSuccess(response),
                    new ProcessoCapaActions.GetProcesso(action.payload),
                    new AddData<Compartilhamento>({data: [response], schema: acompanhamentoSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'acompanhamento',
                        content: 'Erro ao salvar o acompanhamento!',
                        status: 2, // erro
                    }));
                    return of(new ProcessoCapaActions.SaveAcompanhamentoFailed(err));
                })
            );
        })
    ));
    /**
     * Delete Acompanhamento
     *
     * @type {Observable<any>}
     */
    deleteAcompanhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.DeleteAcompanhamento>(ProcessoCapaActions.DELETE_ACOMPANHAMENTO),
        mergeMap((action) => {
            this._store.dispatch(new ProcessoCapaActions.SetToggleAcompanhamento({
                loadingAcompanhamento: true
            }));
            return this._acompanhamentoService.destroy(action.payload.acompanhamentoId).pipe(
                mergeMap(response =>
                    [
                        new RemoveChildData({
                            id: action.payload.acompanhamentoId,
                            childSchema: acompanhamentoSchema,
                            parentSchema: processoSchema,
                            parentId: action.payload.processoId
                        }),
                        new ProcessoCapaActions.DeleteAcompanhamentoSuccess(response.id),
                        new ProcessoCapaActions.SetToggleAcompanhamentoSuccess(
                            {
                                loadingAcompanhamento: false
                            }
                        )
                    ]
                ),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoCapaActions.DeleteAcompanhamentoFailed(action.payload.acompanhamentoId));
                })
            );
        }, 25)
    ));

    getJuntadas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoCapaActions.GetJuntadas>(ProcessoCapaActions.GET_JUNTADAS),
        switchMap(action => this._juntadaService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
            new ProcessoCapaActions.GetJuntadasSuccess({
                entitiesId: response['entities'].map(juntada => juntada.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params['processoHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoCapaActions.GetJuntadasFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _assuntoService: AssuntoService,
        private _interessadoService: InteressadoService,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
        private _store: Store<State>,
        private _acompanhamentoService: AcompanhamentoService,
        private _loginService: LoginService,
        private _juntadaService: JuntadaService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
