import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoActions from 'app/main/apps/processo/store/actions/processo.actions';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {Compartilhamento, Processo} from '@cdk/models';
import {
    compartilhamento as acompanhamentoSchema,
    processo as processoSchema
} from '@cdk/normalizr';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../store/actions/operacoes.actions';
import {Router} from '@angular/router';
import {AcompanhamentoService} from "@cdk/services/acompanhamento.service";

@Injectable()
export class ProcessoEffect {
    routerState: any;
    private _profile: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        public _loginService: LoginService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router,
        private _acompanhamentoService: AcompanhamentoService
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Get Processo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.GetProcesso>(ProcessoActions.GET_PROCESSO),
                switchMap((action) => {
                    const contexto = this.routerState.params.chaveAcessoHandle ? {
                        chaveAcesso: this.routerState.params.chaveAcessoHandle
                    } : {};

                    contexto['compartilhamentoUsuario'] = 'processo';

                    const populate = action.payload.populate ? [...action.payload.populate] : [];
                    this._store.dispatch(new ProcessoActions.SetToggleAcompanhamento({
                        loadingAcompanhamento: true
                    }));

                    return this._processoService.get(
                        action.payload.id,
                        JSON.stringify([
                            ...populate,
                            'especieProcesso',
                            'especieProcesso.generoProcesso',
                            'especieProcesso.workflow',
                            'especieProcesso.workflow.especieTarefaInicial',
                            'tarefaAtualWorkflow',
                            'tarefaAtualWorkflow.especieTarefa',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta']
                        ),
                        JSON.stringify(contexto));
                }),
                switchMap(response => [
                    new AddData<Processo>({data: [response], schema: processoSchema}),
                    new ProcessoActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                            acessoNegado: response.acessoNegado
                        },
                        processoId: response.id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoActions.GetProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Autuar Processo
     * @type {Observable<any>}
     */
    @Effect()
    autuarProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.AutuarProcesso>(ProcessoActions.AUTUAR_PROCESSO),
                switchMap((action) => {
                    return this._processoService.autuar(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new ProcessoActions.AutuarProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} autuado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new ProcessoActions.AutuarProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Create Vinculacao Etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    createVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoActions.CreateVinculacaoEtiqueta>(ProcessoActions.CREATE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    const vinculacaoEtiqueta = new VinculacaoEtiqueta();
                    vinculacaoEtiqueta.processo = action.payload.processo;
                    vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
                    return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                        tap((response) => response.processo = null),
                        mergeMap((response) => [
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [response],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processo.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} etiquetado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoActions.CreateVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );


    /**
     * Save conteúdo vinculação etiqueta no processo
     * @type {Observable<any>}
     */
    @Effect()
    saveConteudoVinculacaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.SaveConteudoVinculacaoEtiqueta>(ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                        // @retirar: return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta,  {conteudo: action.payload.vinculacaoEtiqueta.conteudo}).pipe(
                        mergeMap((response) => [
                            new ProcessoActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                            new UpdateData<VinculacaoEtiqueta>(
                                {id: response.id, schema: vinculacaoEtiquetaSchema, changes:
                                        {conteudo: response.conteudo, privada: response.privada}}
                                        )
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );



    /**
     * Delete Vinculacao Etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoActions.DeleteVinculacaoEtiqueta>(ProcessoActions.DELETE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                        return this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                            mergeMap(() => [
                                new RemoveChildData({
                                    id: action.payload.vinculacaoEtiquetaId,
                                    childSchema: vinculacaoEtiquetaSchema,
                                    parentSchema: processoSchema,
                                    parentId: action.payload.processoId
                                })
                            ]),
                            catchError((err) => {
                                console.log(err);
                                return of(new ProcessoActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                            })
                        );
                    }
                ));

    /**
     * Arquivar Processo
     * @type {Observable<any>}
     */
    @Effect()
    arquivarProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.ArquivarProcesso>(ProcessoActions.ARQUIVAR_PROCESSO),
                switchMap((action) => {
                    return this._processoService.arquivar(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new ProcessoActions.ArquivarProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} arquivado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new ProcessoActions.ArquivarProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Processo Success
     */
    @Effect({ dispatch: false })
    arquivarProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.ArquivarProcesso>(ProcessoActions.ARQUIVAR_PROCESSO_SUCCESS),
                tap(() => {
                    if (this.routerState.params['tarefaHandle']) {
                        this._router.navigate(['apps/tarefas/' +
                            this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle +
                            '/' + this.routerState.params.targetHandle]).then();
                    }
                })
            );

    /**
     * Get Acompanhamento do Processo
     * @type {Observable<any>}
     */
    @Effect()
    getAcompanhamento: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoActions.GetAcompanhamento>(ProcessoActions.GET_ACOMPANHAMENTO),
                switchMap((action) => {
                    return this._acompanhamentoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter
                        }),
                        action.payload.imit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))
                }),
                mergeMap((response) => [
                    new AddData<Compartilhamento>({data: response['entities'], schema: acompanhamentoSchema}),
                    new ProcessoActions.GetAcompanhamentoSuccess({
                        entitiesId: response['entities'].map(acompanhamento => acompanhamento.id),
                        loaded: {
                            id: this.routerState.params['processoCopiaHandle'] ?
                                'processoCopiaHandle' : 'processoHandle',
                            value: this.routerState.params['processoCopiaHandle'] ?
                                this.routerState.params['processoCopiaHandle'] : this.routerState.params['processoHandle']
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoActions.GetAcompanhamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Acompanhamento
     * @type {Observable<any>}
     */
    @Effect()
    saveAcompanhamento: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.SaveAcompanhamento>(ProcessoActions.SAVE_ACOMPANHAMENTO),
                switchMap((action) => {
                    const acompanhamento = new Compartilhamento();
                    acompanhamento.usuario = this._loginService.getUserProfile();
                    acompanhamento.processo = action.payload;
                    return this._acompanhamentoService.save(acompanhamento).pipe(
                        mergeMap((response: Compartilhamento) => [
                            new AddData<Compartilhamento>({data: [response], schema: acompanhamentoSchema}),
                            new ProcessoActions.SaveAcompanhamentoSuccess(response),
                            new ProcessoActions.GetProcesso(action.payload)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoActions.SaveAcompanhamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Acompanhamento
     * @type {Observable<any>}
     */
    @Effect()
    deleteAcompanhamento: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.DeleteAcompanhamento>(ProcessoActions.DELETE_ACOMPANHAMENTO),
                mergeMap((action) => {
                    this._store.dispatch(new ProcessoActions.SetToggleAcompanhamento({
                        loadingAcompanhamento: true
                    }));
                    return this._acompanhamentoService.destroy(action.payload.acompanhamentoId).pipe(
                        mergeMap((response) =>
                            [
                                new RemoveChildData({
                                    id: action.payload.acompanhamentoId,
                                    childSchema: acompanhamentoSchema,
                                    parentSchema: processoSchema,
                                    parentId: action.payload.processoId
                                }),
                                new ProcessoActions.DeleteAcompanhamentoSuccess(response.id),
                                new ProcessoActions.SetToggleAcompanhamentoSuccess(
                                    {
                                        loadingAcompanhamento: false
                                    }
                                ),
                            ],
                        ),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoActions.DeleteAcompanhamentoFailed(action.payload.acompanhamentoId));
                        })
                    );
                })
            );
}
