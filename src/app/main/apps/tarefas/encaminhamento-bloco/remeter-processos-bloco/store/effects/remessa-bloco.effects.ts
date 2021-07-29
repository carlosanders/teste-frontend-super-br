import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RemessaBlocoActions from '../actions/remessa-bloco.actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from "../../../../../../../../@cdk/utils";
import * as moment from "moment";

@Injectable()
export class RemessaBlocoEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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
     * Save Tramitacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTramitacao: any =
        this._actions
            .pipe(
                ofType<RemessaBlocoActions.SaveTramitacao>(RemessaBlocoActions.SAVE_TRAMITACAO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tramitacao',
                    content: 'Salvando a tramitacao ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._tramitacaoService.save(action.payload.tramitacao).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tramitacao',
                                content: 'Tramitacao id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Tramitacao) => [
                            new RemessaBlocoActions.SaveTramitacaoSuccess(response),
                            new AddData<Tramitacao>({data: [response], schema: tramitacaoSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tramitacao',
                                content: 'Erro ao salvar a tramitacao!',
                                status: 2, // erro
                            }));
                            return of(new RemessaBlocoActions.SaveTramitacaoFailed(err));
                        })
                    )
                })
            );
}
