import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RootLotacaoEditActions from '../actions/admin-lotacao-edit.actions';
import * as RootLotacaoListActions from '../../../lotacao-list/store/actions';

import {LotacaoService} from '@cdk/services/lotacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class AdminLotacaoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _lotacaoService: LotacaoService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
     * Get Lotacao with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getLotacao: any =
        this._actions
            .pipe(
                ofType<RootLotacaoEditActions.GetLotacao>(RootLotacaoEditActions.GET_LOTACAO),
                switchMap(action => this._lotacaoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'colaborador.usuario',
                            'setor.unidade',
                            'setor.especieSetor',
                            'setor.generoSetor',
                        ]))),
                switchMap(response => [
                    new AddData<Lotacao>({data: response['entities'], schema: lotacaoSchema}),
                    new RootLotacaoEditActions.GetLotacaoSuccess({
                        loaded: {
                            id: 'lotacaoHandle',
                            value: this.routerState.params.lotacaoHandle
                        },
                        lotacaoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLotacaoEditActions.GetLotacaoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Lotacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveLotacao: any =
        this._actions
            .pipe(
                ofType<RootLotacaoEditActions.SaveLotacao>(RootLotacaoEditActions.SAVE_LOTACAO),
                switchMap(action => this._lotacaoService.save(action.payload).pipe(
                        mergeMap((response: Lotacao) => [
                            new RootLotacaoEditActions.SaveLotacaoSuccess(),
                            new RootLotacaoListActions.ReloadLotacoes(),
                            new AddData<Lotacao>({data: [response], schema: lotacaoSchema})
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLotacaoEditActions.SaveLotacaoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Lotacao Success
     */
    @Effect({dispatch: false})
    saveLotacaoSuccess: any =
        this._actions
            .pipe(
                ofType<RootLotacaoEditActions.SaveLotacaoSuccess>(RootLotacaoEditActions.SAVE_LOTACAO_SUCCESS),
                tap(() => {
                    this._router.navigate(
                        [this.routerState.url.replace(
                            ('editar/' + this.routerState.params.lotacaoHandle),
                            'listar')
                        ]).then();
                })
            );
}
