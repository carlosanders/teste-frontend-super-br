import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import * as RelatorioEditBlocoActions from '../actions/relatorio-edit-bloco.actions';

import {RelatorioService} from '@cdk/services/relatorio.service';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {relatorio as relatorioSchema} from '@cdk/normalizr/relatorio.schema';
import {Relatorio} from '@cdk/models/relatorio.model';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class RelatorioEditBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Relatorio
     * @type {Observable<any>}
     */
    @Effect()
    saveRelatorio: any =
        this._actions
            .pipe(
                ofType<RelatorioEditBlocoActions.SaveRelatorio>(RelatorioEditBlocoActions.SAVE_RELATORIO),
                mergeMap((action) => {
                    return this._relatorioService.patch(action.payload.relatorio, action.payload.changes).pipe(
                        mergeMap((response: Relatorio) => [
                            new RelatorioEditBlocoActions.SaveRelatorioSuccess(action.payload),
                            new UpdateData<Relatorio>({id: response.id, schema: relatorioSchema, changes: {observacao: response.observacao}}),
                            new OperacoesActions.Resultado({
                                type: 'relatorio',
                                content: `Relatorio id ${action.payload.relatorio.id} editada com sucesso!`,
                                success: true
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'relatorio',
                                content: `Houve erro na edição da relatorio id ${action.payload.relatorio.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new RelatorioEditBlocoActions.SaveRelatorioFailed(action.payload));
                        })
                    );
                })
            );

}
