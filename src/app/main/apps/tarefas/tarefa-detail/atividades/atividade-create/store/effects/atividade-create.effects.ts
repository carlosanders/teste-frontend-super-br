import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as AtividadeCreateActions from '../actions/atividade-create.actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr/atividade.schema';
import {Atividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DeleteTarefaSuccess} from '../../../../../store/actions';
import * as fromStore from '../index';

@Injectable()
export class AtividadeCreateEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
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
     * Save Atividade
     * @type {Observable<any>}
     */
    @Effect()
    saveAtividade: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateActions.SaveAtividade>(AtividadeCreateActions.SAVE_ATIVIDADE),
                switchMap((action) => {
                    return this._atividadeService.save(action.payload).pipe(
                        mergeMap((response: Atividade) => [
                            new AtividadeCreateActions.SaveAtividadeSuccess(action.payload),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Atividade id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new AtividadeCreateActions.SaveAtividadeFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Atividade Success
     */
    @Effect({ dispatch: false })
    saveAtividadeSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateActions.SaveAtividadeSuccess>(AtividadeCreateActions.SAVE_ATIVIDADE_SUCCESS),
                tap((action) => {
                    if (action.payload.encerraTarefa) {
                        this._store.dispatch(new DeleteTarefaSuccess(action.payload.tarefa.id));
                    } else {
                        this._store.dispatch(new fromStore.GetDocumentos());
                    }
                    this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/encaminhamento']).then();
                })
            );

}
