import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as DadosBasicosActions from '../actions/dados-basicos.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DadosBasicosEffect {
    routerState: any;
    populate: [];

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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
    @Effect({ dispatch: false })
    saveProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.SaveProcessoSuccess>(DadosBasicosActions.SAVE_PROCESSO_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace('dados-basicos', 'assuntos/listar').replace('criar', action.payload.id)]).then();
                })
            );

    /**
     * Put Processo
     * @type {Observable<any>}
     */
    @Effect()
    putProcesso: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.PutProcesso>(DadosBasicosActions.PUT_PROCESSO),
                switchMap((action) => {
                    return this._processoService.save(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new DadosBasicosActions.PutProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })              
                        ]),
                        catchError((err) => {
                            return of(new DadosBasicosActions.PutProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Post Processo
     * @type {Observable<any>}
     */
    @Effect()
    postProcesso: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.PostProcesso>(DadosBasicosActions.POST_PROCESSO),
                switchMap((action) => {
                    return this._processoService.save(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new DadosBasicosActions.PostProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })              
                        ]),
                        catchError((err) => {
                            return of(new DadosBasicosActions.PostProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Post Processo Success
     */
    @Effect({ dispatch: false })
    postProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.PostProcessoSuccess>(DadosBasicosActions.POST_PROCESSO_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace('dados-basicos', 'assuntos/listar').replace('criar', action.payload.id)]).then();
                })
            );


    @Effect()
    getProcesso: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.GetProcesso>(DadosBasicosActions.GET_PROCESSO),
                switchMap((action) => {
                    this.populate = action.payload.populate ?? [];
                    return this._processoService.query(
                        JSON.stringify(action.payload.filter),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify(this.populate));
                }),
                switchMap(response => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new DadosBasicosActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                            populate: this.populate,
                            acessoNegado: response['entities'][0].acessoNegado
                        },
                        processoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new DadosBasicosActions.GetProcessoFailed(err));
                    return caught;
                })
            );

}
