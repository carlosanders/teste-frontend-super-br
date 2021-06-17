import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
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
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveProcesso: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.SaveProcesso>(DadosBasicosActions.SAVE_PROCESSO),
                switchMap(action => this._processoService.save(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new DadosBasicosActions.SaveProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError(err => of(new DadosBasicosActions.SaveProcessoFailed(err)))
                    ))
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
                    return this._processoService.get(
                        action.payload.id,
                        JSON.stringify(['populateAll', 'especieProcesso.generoProcesso', 'setorAtual.unidade'])
                    );
                }),
                switchMap(response => [
                    new AddData<Processo>({data: [response], schema: processoSchema}),
                    new DadosBasicosActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                            acessoNegado: response.acessoNegado
                        },
                        processoId: this.routerState.params.processoHandle
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new DadosBasicosActions.GetProcessoFailed(err));
                    return caught;
                })
            );

}
