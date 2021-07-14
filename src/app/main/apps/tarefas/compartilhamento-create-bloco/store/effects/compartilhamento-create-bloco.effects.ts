import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as CompartilhamentoCreateBlocoActions from '../actions/compartilhamento-create-bloco.actions';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class CompartilhamentoCreateBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _compartilhamentoService: CompartilhamentoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Compartilhamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveCompartilhamento: any =
        this._actions
            .pipe(
                ofType<CompartilhamentoCreateBlocoActions.SaveCompartilhamento>(CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'compartilhamento',
                    content: 'Salvando o compartilhamento ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._compartilhamentoService.save(action.payload.compartilhamento).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'compartilhamento',
                                content: 'Compartilhamento id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Compartilhamento) => [
                            new CompartilhamentoCreateBlocoActions.SaveCompartilhamentoSuccess(response),
                            new AddData<Compartilhamento>({data: [response], schema: compartilhamentoSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'compartilhamento',
                                content: 'Erro ao salvar o compartilhamento!',
                                status: 2, // erro
                            }));
                            return of(new CompartilhamentoCreateBlocoActions.SaveCompartilhamentoFailed(err));
                        })
                    )
                })
            );

}
