import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
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
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Processo
     * @type {Observable<any>}
     */
    @Effect()
    getProcesso: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.GetProcesso>(DadosBasicosActions.GET_PROCESSO),
                switchMap((action) => {
                    return this._processoService.get(
                        action.payload.id,
                        JSON.stringify([
                            'populateAll',
                            'especieProcesso.generoProcesso',
                            'setorAtual.unidade',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta',
                            'especieProcesso',
                            'especieProcesso.workflow',
                            'especieProcesso.workflow.especieTarefaInicial'
                        ]));
                }),
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
                catchError((err, caught) => {
                    this._store.dispatch(new DadosBasicosActions.GetProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Processo
     * @type {Observable<any>}
     */
    @Effect()
    saveProcesso: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.SaveProcesso>(DadosBasicosActions.SAVE_PROCESSO),
                switchMap((action) => {
                    return this._processoService.save(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new DadosBasicosActions.SaveProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new DadosBasicosActions.SaveProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Processo Success
     */
    @Effect({dispatch: false})
    saveProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.SaveProcessoSuccess>(DadosBasicosActions.SAVE_PROCESSO_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace('criar', action.payload.id)]).then();
                })
            );

    /**
     * Get Juntadas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getJuntadas: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.GetJuntadas>(DadosBasicosActions.GET_JUNTADAS),
                switchMap((action) => {
                    return this._juntadaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context));
                }),
                mergeMap((response) => [
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DadosBasicosActions.GetJuntadasFailed(err));
                    return caught;
                })
            );


    /**
     * Validar NUP
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    getValidateNup: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.ValidaNup>(DadosBasicosActions.VALIDA_NUP),
                switchMap((action) => {
                    return this._processoService.validaNup(
                        action.payload.configuracaoNup,
                        action.payload.nup.replace(/\D/g, ''),
                        action.payload.unidadeArquivistica
                    );
                }),
                mergeMap((response) => [
                    this._store.dispatch(new DadosBasicosActions.ValidaNupSuccess(response))
                ]),
                catchError((err, caught) => {
                    if (err.error.code == 422) {
                        this._store.dispatch(new DadosBasicosActions.ValidaNupInvalid(err));
                    } else {
                        this._store.dispatch(new DadosBasicosActions.ValidaNupFailed(err));
                    }
                    return caught;
                })
            );
}
