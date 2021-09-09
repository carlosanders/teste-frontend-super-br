import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoActions from 'app/main/apps/processo/store/actions/processo.actions';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {Compartilhamento, Processo, VinculacaoEtiqueta} from '@cdk/models';
import {
    compartilhamento as acompanhamentoSchema,
    processo as processoSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema
} from '@cdk/normalizr';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import * as OperacoesActions from '../../../../../store/actions/operacoes.actions';
import {Router} from '@angular/router';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import * as fromStore from '../index';
import {StatusBarramentoService} from '@cdk/services/status-barramento';
import {now} from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ProcessoEffect {
    routerState: any;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetProcesso>(ProcessoActions.GET_PROCESSO),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};

            contexto['compartilhamentoUsuario'] = 'processo';

            const populate = action.payload.populate ? [...action.payload.populate] : [];
            return this._processoService.get(
                action.payload.id,
                JSON.stringify([
                    ...populate,
                    'origemDados',
                    'especieProcesso',
                    'especieProcesso.generoProcesso',
                    'especieProcesso.workflow',
                    'especieProcesso.workflow.especieTarefaInicial',
                    'tarefaAtualWorkflow',
                    'tarefaAtualWorkflow.especieTarefa',
                    'setorAtual',
                    'setorAtual.especieSetor',
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
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetProcessoFailed(err));
        })
    ));
    /**
     * Autuar Processo
     *
     * @type {Observable<any>}
     */
    autuarProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.AutuarProcesso>(ProcessoActions.AUTUAR_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Autuando o processo id ' + action.payload.processo.id + ' ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._processoService.autuar(action.payload.processo).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'processo',
                content: `Processo id ${response.id} autuado com sucesso!`,
                status: 1, // sucesso
            }))),
            mergeMap((response: Processo) => [
                new ProcessoActions.AutuarProcessoSuccess(response),
                new AddData<Processo>({data: [response], schema: processoSchema}),
            ]),
            catchError((err) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: 'Erro ao autuar o processo id ' + action.payload.processo.id + '!',
                    status: 2, // erro
                }));
                return of(new ProcessoActions.AutuarProcessoFailed(err));
            })
        ))
    ));
    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    createVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.CreateVinculacaoEtiqueta>(ProcessoActions.CREATE_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação etiqueta',
            content: 'Salvando a vinculação da etiqueta ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();
            vinculacaoEtiqueta.processo = action.payload.processo;
            vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
            return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                tap((response) => {
                    response.processo = null;
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação etiqueta',
                        content: 'Vinculação da etiqueta id ' + response.id + ' salva com sucesso.',
                        status: 1, // sucesso
                    }));
                }),
                mergeMap((response: VinculacaoEtiqueta) => [
                    new AddChildData<VinculacaoEtiqueta>({
                        data: [response],
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: processoSchema,
                        parentId: action.payload.processo.id
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação da etiqueta',
                        content: 'Erro ao salvar a vinculação da etiqueta!',
                        status: 2, // erro
                    }));
                    return of(new ProcessoActions.CreateVinculacaoEtiquetaFailed(err));
                })
            );
        })
    ));
    /**
     * Save conteúdo vinculação etiqueta no processo
     *
     * @type {Observable<any>}
     */
    saveConteudoVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.SaveConteudoVinculacaoEtiqueta>(ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
            // @retirar: return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta,  {conteudo: action.payload.vinculacaoEtiqueta.conteudo}).pipe(
            mergeMap(response => [
                new ProcessoActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                new UpdateData<VinculacaoEtiqueta>(
                    {
                        id: response.id, schema: vinculacaoEtiquetaSchema, changes:
                            {conteudo: response.conteudo, privada: response.privada}
                    }
                )
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ProcessoActions.SaveConteudoVinculacaoEtiquetaFailed(err));
            })
        ), 25)
    ));
    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.DeleteVinculacaoEtiqueta>(ProcessoActions.DELETE_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
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
        ), 25)
    ));
    /**
     * Arquivar Processo
     *
     * @type {Observable<any>}
     */
    arquivarProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.ArquivarProcesso>(ProcessoActions.ARQUIVAR_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Arquivando o processo id ' + action.payload.processo.id + ' ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._processoService.arquivar(action.payload.processo, action.payload.populate).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'processo',
                content: `Processo id ${response.id} arquivado com sucesso!`,
                status: 1, // sucesso
            }))),
            mergeMap((response: Processo) => [
                new fromStore.RemovePluginLoading('arquivar_processo'),
                new ProcessoActions.ArquivarProcessoSuccess(response),
                new UpdateData<Processo>({
                    id: response.id, schema: processoSchema, changes:
                        {
                            setorAtual: response.setorAtual,
                            modalidadeFase: response.modalidadeFase,
                            atualizadoEm: response.atualizadoEm
                        }
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: 'Erro ao arquivar o processo id ' + action.payload.processo.id + '!',
                    status: 2, // erro
                }));
                this._store.dispatch(new fromStore.RemovePluginLoading('arquivar_processo'));
                return of(new ProcessoActions.ArquivarProcessoFailed(err));
            })
        ))
    ));
    /**
     * Save Processo Success
     */
    arquivarProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.ArquivarProcesso>(ProcessoActions.ARQUIVAR_PROCESSO_SUCCESS),
        tap(() => {
            if (this.routerState.params['tarefaHandle']) {
                this._router.navigate(['apps/tarefas/' +
                this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle +
                '/' + this.routerState.params.targetHandle]).then();
            }
        })
    ), {dispatch: false});
    /**
     * Get Acompanhamento do Processo
     *
     * @type {Observable<any>}
     */
    getAcompanhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetAcompanhamento>(ProcessoActions.GET_ACOMPANHAMENTO),
        switchMap(action => this._acompanhamentoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.listFilter
            }),
            action.payload.imit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
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
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetAcompanhamentoFailed(err));
        })
    ));
    /**
     * Save Acompanhamento
     *
     * @type {Observable<any>}
     */
    saveAcompanhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.SaveAcompanhamento>(ProcessoActions.SAVE_ACOMPANHAMENTO),
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
            return this._acompanhamentoService.save(acompanhamento).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'acompanhamento',
                    content: 'Acompanhamento id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Compartilhamento) => [
                    new ProcessoActions.SaveAcompanhamentoSuccess(response),
                    new ProcessoActions.GetProcesso(action.payload.processo),
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
                    return of(new ProcessoActions.SaveAcompanhamentoFailed(err));
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
        ofType<ProcessoActions.DeleteAcompanhamento>(ProcessoActions.DELETE_ACOMPANHAMENTO),
        mergeMap(action => this._acompanhamentoService.destroy(action.payload.acompanhamentoId).pipe(
            mergeMap(response =>
                [
                    new RemoveChildData({
                        id: action.payload.acompanhamentoId,
                        childSchema: acompanhamentoSchema,
                        parentSchema: processoSchema,
                        parentId: action.payload.processoId
                    }),
                    new ProcessoActions.DeleteAcompanhamentoSuccess(response.id)
                ],
            ),
            catchError((err) => {
                console.log(err);
                return of(new ProcessoActions.DeleteAcompanhamentoFailed(action.payload.acompanhamentoId));
            })
        ), 25)
    ));
    /**
     * Sincroniza Barramento
     *
     * @type {Observable<any>}
     */
    sincronizaBarramento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.SincronizaBarramento>(ProcessoActions.SINCRONIZA_BARRAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'status barramento',
            content: 'Solicitando sincronização do processo nup ' + action.payload.processo.NUP + '...',
            status: 0, // carregando
        }))),
        switchMap(action => this._statusBarramentoService.sincronizaBarramento(action.payload.processo).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'status barramento',
                content: 'Enviado o processo nup ' + action.payload.processo.NUP + 'para sincronização com barramento.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Processo) => [
                new ProcessoActions.SincronizaBarramentoSuccess(response),
            ]),
            tap(() => {
                this._snackBar.open(
                    'A sincronização do barramento será em segundo plano. Aguarde a notificação!',
                    'Fechar',
                    {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['cdk-white-bg', 'sincroniza-barramento-snackbar']
                    }
                );
            })
        ))
    ));

    private _profile: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        public _loginService: LoginService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router,
        private _acompanhamentoService: AcompanhamentoService,
        private _statusBarramentoService: StatusBarramentoService,
        private _snackBar: MatSnackBar
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
    }

}
