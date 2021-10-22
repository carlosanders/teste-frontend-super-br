import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProcessoService} from '@cdk/services/processo.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Router} from '@angular/router';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import * as ProcessoActions from '../actions/processo.actions';
import {of} from 'rxjs';
import {ChangeProcessos, getProcessosIds} from '../../../arquivista-list/store';
import * as moment from 'moment';

@Injectable()
export class ProcessoEffects {
    routerState: any;
    /**
     * Save Processo Arquivistico
     */
    saveProcesso: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.SaveProcesso>(ProcessoActions.SAVE_PROCESSO),
        switchMap(action => this._processoService.patch(action.payload.processo, action.payload.changes).pipe(
            mergeMap(response => [
                new UpdateData<Processo>({
                    id: response.id,
                    schema: processoSchema,
                    changes: {
                        classificacao: response.classificacao,
                        lembreteArquivista: response.lembreteArquivista,
                        dataHoraProximaTransicao: response.dataHoraProximaTransicao
                    }
                }),
                new ProcessoActions.SaveProcessoSuccess(response)
            ]),
            catchError(err => of(new ProcessoActions.SaveProcessoFailed(err)))
        ))
    ));
    /**
     * Save Processo Success
     */
    saveProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.SaveProcessoSuccess>(ProcessoActions.SAVE_PROCESSO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getProcessosIds))),
        tap(([action, entitiesId]) => {
            const currentDate = moment();
            let typeHandle = this.routerState.params['typeHandle'];
            if (!action.payload.dataHoraProximaTransicao) {
                typeHandle = 'pendencia-analise';
            } else if (action.payload.dataHoraProximaTransicao > currentDate) {
                typeHandle = 'aguardando-decurso';
            } else if (action.payload.dataHoraProximaTransicao <= currentDate) {
                typeHandle = 'pronto-transicao';
            }
            if (typeHandle !== this.routerState.params['typeHandle']) {
                const newEntitiesId = entitiesId.filter(id => id !== action.payload.processo.id);
                this._store.dispatch(new ChangeProcessos(newEntitiesId));
            }
            this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/'
            + this.routerState.params['typeHandle']]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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
