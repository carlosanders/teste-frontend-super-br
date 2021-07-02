import {AddChildData, AddData, UpdateData} from '@cdk/ngrx-normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessosActions from '../actions/protocolos-externos.actions';

import {Assunto, Interessado, Pessoa, Processo, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {
    assunto as assuntoSchema,
    interessado as interessadoSchema,
    pessoa as pessoaSchema,
    processo as processoSchema
} from '@cdk/normalizr';
import {ProcessoService} from '@cdk/services/processo.service';
import {AssuntoService} from '@cdk/services/assunto.service';
import {PessoaService} from '@cdk/services/pessoa.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {getPagination} from '../selectors';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ProcessosActionsAll} from '../actions/protocolos-externos.actions';

@Injectable()
export class ProcessosEffect {
    private _profile: Usuario;
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _assuntoService: AssuntoService,
        private _pessoaService: PessoaService,
        private _interessadoService: InteressadoService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Get Processos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetProcessos>(ProcessosActions.GET_PROCESSOS),
                switchMap(action => this._processoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))),
                concatMap(response => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ProcessosActions.GetProcessosSuccess({
                        entitiesId: response['entities'].map(processo => processo.id),
                        loaded: {
                            id: 'typeHandle_targetHandle',
                            value: this.routerState.params.typeHandle + '_' + this.routerState.params.targetHandle + '_' + this._profile.id,
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * Reload Processos
     */
    @Effect({dispatch: false})
    reloadProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessosActions.ReloadProcessos>(ProcessosActions.RELOAD_PROCESSOS),
                withLatestFrom(this._store.pipe(select(getPagination))),
                tap(([action, pagination]) => this._store.dispatch(new ProcessosActions.GetProcessos(pagination)))
            );

    /**
     * Update Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentProcesso: Observable<ProcessosActions.ProcessosActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessosActions.SetCurrentProcesso>(ProcessosActions.SET_CURRENT_PROCESSO),
                map((action) => {
                    this._router.navigate([
                        'apps/protocolo-externo/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle
                        + '/detalhe/' + action.payload.processoId + '/processo/' + action.payload.processoId + '/visualizar']
                    ).then();

                    return new ProcessosActions.SetCurrentProcessoSuccess();
                })
            );

    /**
     * Update Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    createProcesso: Observable<ProcessosActions.ProcessosActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessosActions.CreateProcesso>(ProcessosActions.CREATE_PROCESSO),
                map(() => {
                    this._router.navigate(['apps/protocolo-externo/' + this.routerState.params.typeHandle
                    + '/' + this.routerState.params.targetHandle + '/criar']).then();
                    return new ProcessosActions.CreateProcessoSuccess();
                })
            );

    /**
     * Delete Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteProcesso: Observable<ProcessosActions.ProcessosActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessosActions.DeleteProcesso>(ProcessosActions.DELETE_PROCESSO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'processo',
                        content: 'Apagando a processo id ' + action.payload.processoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._processoService.destroy(action.payload.processoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'processo',
                                content: 'Processo id ' + action.payload.processoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Processo>({
                                id: response.id,
                                schema: processoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new ProcessosActions.DeleteProcessoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.processoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'processo',
                                content: 'Erro ao apagar a processo id ' + action.payload.processoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new ProcessosActions.DeleteProcessoFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Get Pessoa Conveniada
     *
     * @type {Observable<any>}
     */
    @Effect()
    getPessoa: any =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetPessoa>(ProcessosActions.GET_PESSOA),
                switchMap(action => this._pessoaService.search(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)
                    )),
                mergeMap(response => [
                    new AddData<Pessoa>({data: response['entities'], schema: pessoaSchema}),
                    new ProcessosActions.GetPessoaSuccess({
                        loaded: {
                            id: 'typeHandle_targetHandle',
                            value: this.routerState.params.typeHandle + '_' + this.routerState.params.targetHandle
                        },
                        pessoa: response['entities'][0]
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetProcessosFailed(err));
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
                ofType<ProcessosActions.GetAssuntosProcesso>(ProcessosActions.GET_ASSUNTOS_PROCESSO),
                switchMap(action => this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.params.filter
                        }),
                        action.payload.params.limit,
                        action.payload.params.offset,
                        JSON.stringify(action.payload.params.sort),
                        JSON.stringify(action.payload.params.populate)).pipe(
                        mergeMap(response => [
                            new ProcessosActions.GetAssuntosProcessoSuccess(action.payload.processoId),
                            new AddChildData<Assunto>({
                                data: response['entities'],
                                childSchema: assuntoSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processoId
                            }),
                        ]),
                        catchError((err, caught) => {
                            console.log(err);
                            this._store.dispatch(new ProcessosActions.GetAssuntosProcessoFailed(action.payload.processoId));
                            return caught;
                        })
                    ))
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
                ofType<ProcessosActions.GetInteressadosProcesso>(ProcessosActions.GET_INTERESSADOS_PROCESSO),
                switchMap(action => this._interessadoService.query(
                        JSON.stringify({
                            ...action.payload.params.filter
                        }),
                        action.payload.params.limit,
                        action.payload.params.offset,
                        JSON.stringify(action.payload.params.sort),
                        JSON.stringify(action.payload.params.populate)).pipe(
                        mergeMap(response => [
                            new ProcessosActions.GetInteressadosProcessoSuccess(action.payload.processoId),
                            new AddChildData<Interessado>({
                                data: response['entities'],
                                childSchema: interessadoSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processoId
                            }),
                        ]),
                        catchError((err, caught) => {
                            console.log(err);
                            this._store.dispatch(new ProcessosActions.GetInteressadosProcessoFailed(action.payload.processoId));
                            return caught;
                        })
                    ))
            );
}
