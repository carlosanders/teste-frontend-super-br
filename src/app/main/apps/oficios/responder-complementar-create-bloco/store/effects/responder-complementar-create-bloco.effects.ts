import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';

import * as ResponderComplementarCreateBlocoActions from '../actions/responder-complementar-create-bloco.actions';

import { DocumentoAvulsoService } from '@cdk/services/documento-avulso.service';
import { AddData } from '@cdk/ngrx-normalizr';
import { documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import { Documento } from '@cdk/models';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getRouterState, State } from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class ResponderComplementarCreateBlocoEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _store: Store<State>,
        private _router: Router
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
     * Save Atividade
     * @type {Observable<any>}
     */
    @Effect()
    saveAtividade: any =
        this._actions
            .pipe(
                ofType<ResponderComplementarCreateBlocoActions.CreateResponderComplementarCreateBloco>(ResponderComplementarCreateBlocoActions.CREATE_RESPONDER_COMPLEMENTAR_BLOCO),
                mergeMap((action) => {
                    return this._documentoAvulsoService.save(action.payload).pipe(
                        mergeMap((response: Atividade) => [
                            new AtividadeCreateBlocoActions.SaveAtividadeSuccess(action.payload),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Atividade na tarefa id ${action.payload.tarefa.id} criado com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Houve erro no atividade na tarefa id ${action.payload.tarefa.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new AtividadeCreateBlocoActions.SaveAtividadeFailed(action.payload));
                        })
                    );
                })
            );

}
