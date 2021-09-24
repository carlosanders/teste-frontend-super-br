import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as RemessaBlocoActions from '../actions/remessa-bloco.actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RemessaBlocoEffects {
    routerState: any;
    /**
     * Save Tramitacao
     *
     * @type {Observable<any>}
     */
    saveTramitacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RemessaBlocoActions.SaveTramitacao>(RemessaBlocoActions.SAVE_TRAMITACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tramitação',
            content: 'Salvando a tramitação ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tramitacaoService.save(action.payload.tramitacao).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tramitação',
                content: 'Tramitação id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Tramitacao) => [
                new RemessaBlocoActions.SaveTramitacaoSuccess(action.payload),
                new AddData<Tramitacao>({data: [response], schema: tramitacaoSchema})
            ]),
            catchError((err) => {
                const payload = {
                    id: action.payload.tramitacao.processo.id,
                    errors: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tramitação',
                    content: 'Erro ao salvar a tramitação!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new RemessaBlocoActions.SaveTramitacaoFailed(payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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
