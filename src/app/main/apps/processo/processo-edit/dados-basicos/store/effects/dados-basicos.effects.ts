import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as DadosBasicosActions from '../actions/dados-basicos.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema, processo} from '@cdk/normalizr/processo.schema';
import {Processo} from '@cdk/models/processo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import { GetProcesso } from 'app/main/apps/tarefas/tarefa-create/store';
import * as fromStore from '../';


@Injectable()
export class DadosBasicosEffect {
    routerState: any;

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
/*                tap(n => {
                    console.log('SaveProcessoDadosBasicos: '); 
                    console.log(n);
                }),*/
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
                            console.log ('caiu nesse erro 2' + err);
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
/*                tap(n => {
                    console.log('PutProcessoDadosBasicos: '); 
                    console.log(n);
                }),*/
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
                            console.log ('caiu nesse erro 2' + err);
                            return of(new DadosBasicosActions.PutProcessoFailed(err));
                        })
                    );
                })
            );
    /**
     * Put Processo Success
     */
    @Effect({ dispatch: false })
    putProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.PutProcessoSuccess>(DadosBasicosActions.PUT_PROCESSO_SUCCESS),
                tap((action) => {
//                      this._store.dispatch(new fromStore.CreateProcesso());
//                    this._router.navigate([this.routerState.url.replace('dados-basicos', 'processo-empty').replace(action.payload.id, 'criar')]).then();
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
/*                tap((n) => {
                    console.log('PostProcessoDadosBasicos: '); 
                    console.log(n);
                }),*/
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
                            console.log ('caiu nesse erro 2' + err);
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
                tap((n) => {
                    console.log('entrou GET Effects Dados Basicos: '); 
                    console.log(n);
                }),
                ofType<DadosBasicosActions.GetProcesso>(DadosBasicosActions.GET_PROCESSO),
                switchMap((action) => {
                    return this._processoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'setorAtual.unidade',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new DadosBasicosActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                            acessoNegado: response['entities'][0].acessoNegado
                        },
                        processoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log('caiu nesse erro' + err);
                    this._store.dispatch(new DadosBasicosActions.GetProcessoFailed(err));
                    return caught;
                })
            );

}
