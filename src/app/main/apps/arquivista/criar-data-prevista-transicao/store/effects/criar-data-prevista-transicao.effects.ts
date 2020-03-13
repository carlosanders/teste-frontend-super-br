import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProcessoService} from '@cdk/services/processo.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store/reducers';
import {Router} from '@angular/router';
import * as DataPrevistaTransicaoActions from '../actions/criar-data-prevista-transicao.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import * as fromStoreProcesso from '../../../../processo/store';

@Injectable()
export class CriarDataPrevistaTransicaoEffects {
    routerState: any;
    private currentDate: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this.initRouterState();
    }

    /**
     * Save Lembrete
     * @type {Observable<any>}
     */
    @Effect()
    saveDataPrevistaTransicao: any =
        this._actions
            .pipe(
                ofType<DataPrevistaTransicaoActions.SaveDataPrevistaTransicao>(DataPrevistaTransicaoActions.SAVE_DATA_PREVISTA_TRANSICAO),
                switchMap((action) => {
                    return this._processoService.patch(action.payload.values.processo, action.payload.changes).pipe(
                        mergeMap((response: Processo) => [
                            new DataPrevistaTransicaoActions.SaveDataPrevistaTransicaoSuccess(),
                            new UpdateData<Processo>({id: response.id, schema: processoSchema, changes: {dataHoraProximaTransicao: response.dataHoraProximaTransicao}}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} Atualizado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new DataPrevistaTransicaoActions.SaveDataPrevistaTransicaoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Lembrete Success
     */
    @Effect({dispatch: false})
    saveLembreteSuccess: any =
        this._actions
            .pipe(
                ofType<DataPrevistaTransicaoActions.SaveDataPrevistaTransicaoSuccess>(DataPrevistaTransicaoActions.SAVE_DATA_PREVISTA_TRANSICAO_SUCCESS),
                tap(() => {
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle
                    + '/aguardando-decurso/detalhe/processo/' + this.routerState.params.processoHandle + '/visualizar']).then();
                })
            );


    initRouterState(): void{
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }
}
