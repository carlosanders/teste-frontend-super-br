import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as VinculacaoPessoaBarramentoEditActions from '../actions/vinculacao-pessoa-barramento-edit.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as VinculacaoPessoaBarramentoListActions from '../../../../../../pessoa/pessoa-edit/vinculacao-pessoa-barramento/vinculacao-pessoa-barramento-list/store/actions';
import {VinculacaoPessoaBarramento} from "@cdk/models/vinculacao-pessoa-barramento";
import {vinculacaoPessoaBarramento as vinculacaoPessoaBarramentoSchema} from '@cdk/normalizr/index';
import {VinculacaoPessoaBarramentoService} from "@cdk/services/vinculacao-pessoa-barramento.service";

@Injectable()
export class VinculacaoPessoaBarramentoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaBarramentoService: VinculacaoPessoaBarramentoService,
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
     * Get VinculacaoPessoaBarramento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacaoPessoaBarramento: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaBarramentoEditActions.GetVinculacaoPessoaBarramento>(VinculacaoPessoaBarramentoEditActions.GET_VINCULACAO_PESSOA_BARRAMENTO),
                switchMap((action) => {
                    return this._vinculacaoPessoaBarramentoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<VinculacaoPessoaBarramento>({data: response['entities'], schema: vinculacaoPessoaBarramentoSchema}),
                    new VinculacaoPessoaBarramentoEditActions.GetVinculacaoPessoaBarramentoSuccess({
                        loaded: {
                            id: 'vinculacaoPessoaBarramentoHandle',
                            value: this.routerState.params.vinculacaoPessoaBarramentoHandle
                        },
                        vinculacaoPessoaBarramentoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoPessoaBarramentoEditActions.GetVinculacaoPessoaBarramentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoPessoaBarramento
     * @type {Observable<any>}
     */
    @Effect()
    saveVinculacaoPessoaBarramento: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramento>(VinculacaoPessoaBarramentoEditActions.SAVE_VINCULACAO_PESSOA_BARRAMENTO),
                switchMap((action) => {
                    return this._vinculacaoPessoaBarramentoService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoPessoaBarramento) => [
                            new VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramentoSuccess(),
                            new VinculacaoPessoaBarramentoListActions.ReloadVinculacaoPessoaBarramentos(),
                            new AddData<VinculacaoPessoaBarramento>({data: [response], schema: vinculacaoPessoaBarramentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'vinculacaoPessoaBarramento',
                                content: `VinculacaoPessoaBarramento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramentoFailed(err));
                        })
                    );
                })
            );
    /**
     * Save VinculacaoPessoaBarramento Success
     */
    @Effect({dispatch: false})
    saveVinculacaoPessoaBarramentoSuccess: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramentoSuccess>(VinculacaoPessoaBarramentoEditActions.SAVE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('vinculacao-pessoa-barramento/'), 'vinculacao-pessoa-barramento/listar')]).then();
                })
            );
}
