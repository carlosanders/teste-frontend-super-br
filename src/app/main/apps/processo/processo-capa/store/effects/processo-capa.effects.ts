import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoCapaActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData, RemoveChildData} from '@cdk/ngrx-normalizr';
import {Assunto, Compartilhamento, Interessado, Processo, Usuario, VinculacaoProcesso} from '@cdk/models';
import {
    assunto as assuntoSchema,
    compartilhamento as acompanhamentoSchema,
    interessado as interessadoSchema,
    processo as processoSchema,
    vinculacaoProcesso as vinculacaoProcessoSchema
} from '@cdk/normalizr';
import {AssuntoService} from '@cdk/services/assunto.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {LoginService} from '../../../../../auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ProcessoCapaEffect {
    routerState: any;
    usuario: Usuario;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _assuntoService: AssuntoService,
        private _interessadoService: InteressadoService,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
        private _store: Store<State>,
        private _acompanhamentoService: AcompanhamentoService,
        private _loginService: LoginService
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
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getProcesso: any =
        this._actions
            .pipe(
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
,                           'especieProcesso.workflow',
                            'especieProcesso.generoProcesso'
                        ]),
                        JSON.stringify(contexto));
                }),
                mergeMap(response => [
                    new AddData<Processo>({data: [response], schema: processoSchema}),
                    new ProcessoCapaActions.GetProcessoSuccess({
                        loaded: {
                            id: this.routerState.params['processoCopiaHandle'] ?
                                'processoCopiaHandle' : 'processoHandle',
                            value: this.routerState.params['processoCopiaHandle'] ?
                                this.routerState.params['processoCopiaHandle'] : this.routerState.params['processoHandle']
                        },
                        processoId: this.routerState.params['processoCopiaHandle'] ?
                            this.routerState.params['processoCopiaHandle'] : this.routerState.params['processoHandle'],
                        loadingAcompanhamento: false
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoCapaActions.GetProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Get Assuntos Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoCapaActions.GetAssuntos>(ProcessoCapaActions.GET_ASSUNTOS),
                switchMap(action => {
                    const contexto = this.routerState.params.chaveAcessoHandle ? {
                        chaveAcesso: this.routerState.params.chaveAcessoHandle
                    } : {};
                    return this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.imit,
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
                    this._store.dispatch(new ProcessoCapaActions.GetAssuntosFailed(err));
                    return caught;
                })
            );

    /**
     * GetInteressados Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    getInteressadosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoCapaActions.GetInteressados>(ProcessoCapaActions.GET_INTERESSADOS),
                switchMap(action => {
                    const contexto = this.routerState.params.chaveAcessoHandle ? {
                        chaveAcesso: this.routerState.params.chaveAcessoHandle
                    } : {};
                    return this._interessadoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.imit,
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
                    this._store.dispatch(new ProcessoCapaActions.GetInteressadosFailed(err));
                    return caught;
                })
            );

    /**
     * GetVinculacoesProcessos Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacoesProcessosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoCapaActions.GetVinculacoesProcessos>(ProcessoCapaActions.GET_VINCULACOES_PROCESSOS),
                switchMap(action => {
                    const contexto = this.routerState.params.chaveAcessoHandle ? {
                        chaveAcesso: this.routerState.params.chaveAcessoHandle
                    } : {};
                    return this._vinculacaoProcessoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.imit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(contexto));
                }),
                mergeMap(response => [
                    new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
                    new ProcessoCapaActions.GetVinculacoesProcessosSuccess({
                        entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
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
                    this._store.dispatch(new ProcessoCapaActions.GetVinculacoesProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * Get Acompanhamento do Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAcompanhamento: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoCapaActions.GetAcompanhamento>(ProcessoCapaActions.GET_ACOMPANHAMENTO),
                switchMap(action => this._acompanhamentoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.imit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))),
                mergeMap(response => [
                    new AddData<Compartilhamento>({data: response['entities'], schema: acompanhamentoSchema}),
                    new ProcessoCapaActions.GetAcompanhamentoSuccess({
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
                    this._store.dispatch(new ProcessoCapaActions.GetAcompanhamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Acompanhamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveAcompanhamento: any =
        this._actions
            .pipe(
                ofType<ProcessoCapaActions.SaveAcompanhamento>(ProcessoCapaActions.SAVE_ACOMPANHAMENTO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'acompanhamento',
                    content: 'Salvando a acompanhamento ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    const acompanhamento = new Compartilhamento();
                    acompanhamento.usuario = this._loginService.getUserProfile();
                    acompanhamento.processo = action.payload.processo;
                    return this._acompanhamentoService.save(action.payload.acompanhamento).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'acompanhamento',
                                content: 'Acompanhamento id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
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
                                content: 'Erro ao salvar a acompanhamento!',
                                status: 2, // erro
                            }));
                            return of(new ProcessoCapaActions.SaveAcompanhamentoFailed(err));
                        })
                    )
                })
            );

    /**
     * Delete Acompanhamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteAcompanhamento: any =
        this._actions
            .pipe(
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
            );
}
