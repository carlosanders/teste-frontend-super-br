import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProcessoService} from '@cdk/services/processo.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store/reducers';
import {Router} from '@angular/router';
import * as ArquivistaClassificacaoBloco from '../actions/arquivista-classificacao-bloco.actions';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ArquivistaClassificacaoBlocoBlocoEffects {
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
     * Save ArquivistaClassificacaoBloco
     * @type {Observable<any>}
     */
    @Effect()
    saveArquivistaClassificacaoBloco: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoBloco.SaveArquivistaClassificacaoBloco>(ArquivistaClassificacaoBloco.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO),
                switchMap((action) => {
                    return this._processoService.patch(action.payload, {classificacao: action.payload.classificacao}).pipe(
                        mergeMap((response: Processo) => [
                            new ArquivistaClassificacaoBloco.SaveArquivistaClassificacaoBlocoSuccess(action.payload),
                            new UpdateData<Processo>({id: response.id, schema: processoSchema, changes: {classificacao: response.classificacao}}),
                            new OperacoesActions.Resultado({
                                type: 'classificacao',
                                content: `Classificações de processos Atualizados com sucesso!`,
                                dateTime: response.criadoEm,
                                success: true
                            })
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'classificacao',
                                content: `Houve ao adicionar lembrete ao processo id ${action.payload.processo.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new ArquivistaClassificacaoBloco.SaveArquivistaClassificacaoBlocoFailed(err));
                        })
                    );
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

