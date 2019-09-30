import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as AtividadeDocumentoActions from '../actions/atividade-documento.actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr/atividade.schema';
import {Atividade} from '@cdk/models/atividade.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DeleteTarefaSuccess} from '../../../tarefas/store/actions';
import {UnloadDocumento} from '../actions';
import * as fromStore from '../../../tarefas/tarefa-detail/atividades/atividade-create/store/effects/atividade-create.effects';
import {GetDocumentos} from '../../../tarefas/tarefa-detail/atividades/atividade-create/store/actions';

@Injectable()
export class AtividadeDocumentoEffect {
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
                ofType<AtividadeDocumentoActions.SaveAtividade>(AtividadeDocumentoActions.SAVE_ATIVIDADE),
                switchMap((action) => {
                    return this._atividadeService.save(action.payload).pipe(
                        mergeMap((response: Atividade) => [
                            new AtividadeDocumentoActions.SaveAtividadeSuccess(action.payload),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Atividade id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new AtividadeDocumentoActions.SaveAtividadeFailed(err));
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
                ofType<AtividadeDocumentoActions.SaveAtividadeSuccess>(AtividadeDocumentoActions.SAVE_ATIVIDADE_SUCCESS),
                tap((action) => {
                    if (action.payload.encerraTarefa) {
                        this._store.dispatch(new DeleteTarefaSuccess(action.payload.tarefa.id));
                    } else {
                        this._store.dispatch(new GetDocumentos());
                    }
                    this._store.dispatch(new UnloadDocumento());
                    this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/encaminhamento']).then();
                })
            );

}