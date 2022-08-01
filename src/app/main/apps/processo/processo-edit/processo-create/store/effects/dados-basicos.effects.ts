import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as DadosBasicosActions from '../actions';
import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema, processo as processoSchema,} from '@cdk/normalizr';
import {Juntada, Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {JuntadaService} from '@cdk/services/juntada.service';

@Injectable()
export class DadosBasicosEffect {
    routerState: any;
    /**
     * Get Processo
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DadosBasicosActions.GetProcesso>(DadosBasicosActions.GET_PROCESSO),
        switchMap(action => this._processoService.get(
            action.payload.id,
            JSON.stringify([
                'populateAll',
                'origemDados',
                'especieProcesso.generoProcesso',
                'setorAtual.unidade',
                'setorAtual.especieSetor',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta',
                'tarefaAtualWorkflow',
                'tarefaAtualWorkflow.especieTarefa',
                'especieProcesso',
                'especieProcesso.vinculacoesEspecieProcessoWorkflow',
                'especieProcesso.vinculacoesEspecieProcessoWorkflow.workflow'
            ]),
            JSON.stringify({'especieProcessoWorkflow': true})
        )),
        switchMap(response => [
            new AddData<Processo>({data: [response], schema: processoSchema}),
            new DadosBasicosActions.GetProcessoSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                    acessoNegado: response.acessoNegado
                },
                processoId: response.id
            })
        ]),
        catchError(err => of(new DadosBasicosActions.GetProcessoFailed(err)))
    ));
    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    saveProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DadosBasicosActions.SaveProcesso>(DadosBasicosActions.SAVE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Salvando o processo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._processoService.save(action.payload.processo, '{}').pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'processo',
                content: 'Processo id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Processo) => [
                new DadosBasicosActions.SaveProcessoSuccess(response),
                new AddData<Processo>({data: [response], schema: processoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: 'Erro ao salvar o processo!',
                    status: 2, // erro
                }));
                return of(new DadosBasicosActions.SaveProcessoFailed(err));
            })
        ))
    ));
    /**
     * Save Processo Success
     */
    saveProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DadosBasicosActions.SaveProcessoSuccess>(DadosBasicosActions.SAVE_PROCESSO_SUCCESS),
        tap((action) => {
            this._router.navigate([this.routerState.url.replace('criar', action.payload.id)]).then();
        })
    ), {dispatch: false});
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DadosBasicosActions.GetJuntadas>(DadosBasicosActions.GET_JUNTADAS),
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
            new DadosBasicosActions.GetJuntadasSuccess({
                entitiesId: response['entities'].map(juntada => juntada.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DadosBasicosActions.GetJuntadasFailed(err));
        })
    ));
    /**
     * Validar NUP
     *
     * @type {Observable<any>}
     */
    getValidateNup: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DadosBasicosActions.ValidaNup>(DadosBasicosActions.VALIDA_NUP),
        switchMap(action => this._processoService.validaNup(
            action.payload.configuracaoNup,
            action.payload.nup.replace(/\D/g, ''),
            action.payload.unidadeArquivistica
        )),
        tap((response) => {
            this._store.dispatch(new DadosBasicosActions.ValidaNupSuccess(response));
        }),
        catchError((err) => {
            if (err.error.code === 422) {
                return of(new DadosBasicosActions.ValidaNupInvalid(err));
            } else {
                return of(new DadosBasicosActions.ValidaNupFailed(err));
            }
        })
    ), {dispatch: false});

    /**
     * @param _actions
     * @param _processoService
     * @param _juntadaService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _juntadaService: JuntadaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
