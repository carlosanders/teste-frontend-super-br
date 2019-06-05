import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as TramitacaoEditActions from '../actions/tramitacao-edit.actions';
import * as TramitacaoListActions from '../../../tramitacao-list/store/actions/tramitacao-list.actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr/tramitacao.schema';
import {Tramitacao} from '@cdk/models/tramitacao.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TramitacaoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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
     * Get Tramitacao with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTramitacao: any =
        this._actions
            .pipe(
                ofType<TramitacaoEditActions.GetTramitacao>(TramitacaoEditActions.GET_TRAMITACAO),
                switchMap((action) => {
                    return this._tramitacaoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Tramitacao>({data: response['entities'], schema: tramitacaoSchema}),
                    new TramitacaoEditActions.GetTramitacaoSuccess({
                        loaded: {
                            id: 'tramitacaoHandle',
                            value: this.routerState.params.tramitacaoHandle
                        },
                        tramitacaoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TramitacaoEditActions.GetTramitacaoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Tramitacao
     * @type {Observable<any>}
     */
    @Effect()
    saveTramitacao: any =
        this._actions
            .pipe(
                ofType<TramitacaoEditActions.SaveTramitacao>(TramitacaoEditActions.SAVE_TRAMITACAO),
                switchMap((action) => {
                    return this._tramitacaoService.save(action.payload).pipe(
                        mergeMap((response: Tramitacao) => [
                            new TramitacaoEditActions.SaveTramitacaoSuccess(),
                            new TramitacaoListActions.ReloadTramitacoes(),
                            new AddData<Tramitacao>({data: [response], schema: tramitacaoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tramitacao',
                                content: `Tramitação id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new TramitacaoEditActions.SaveTramitacaoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Tramitacao Success
     */
    @Effect({dispatch: false})
    saveTramitacaoSuccess: any =
        this._actions
            .pipe(
                ofType<TramitacaoEditActions.SaveTramitacaoSuccess>(TramitacaoEditActions.SAVE_TRAMITACAO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.tramitacaoHandle), 'listar')]).then();
                })
            );
}
