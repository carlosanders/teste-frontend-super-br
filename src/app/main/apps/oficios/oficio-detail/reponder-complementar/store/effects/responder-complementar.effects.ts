import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as AtividadeCreateActions from '../actions/responder-complementar.actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr/atividade.schema';
import {Atividade} from '@cdk/models/atividade.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../index';
import {DeleteDocumentoAvulso} from '../../../../../processo/processo-edit/documentos-avulsos/documento-avulso-list/store/actions';

@Injectable()
export class ResponderComplementarEffect {
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
    saveResponder: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateActions.SaveResposta>(AtividadeCreateActions.SAVE_RESPOSTA),
                switchMap((action) => {
                    return this._atividadeService.save(action.payload).pipe(
                        mergeMap((response: Atividade) => [
                            new AtividadeCreateActions.SaveRespostaSuccess(action.payload),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Atividade id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new AtividadeCreateActions.SaveRespostaFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Atividade Success
     */
    @Effect({ dispatch: false })
    saveResponderSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateActions.SaveRespostaSuccess>(AtividadeCreateActions.SAVE_RESPOSTA_SUCCESS),
                tap((action) => {
                    if (action.payload.encerraTarefa) {
                        this._store.dispatch(new DeleteDocumentoAvulso(action.payload.tarefa.id));
                    } else {
                        this._store.dispatch(new fromStore.GetDocumentos());
                    }
                    this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/encaminhamento']).then();
                })
            );

}
