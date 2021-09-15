import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AdminLotacaoEditEffects {
    routerState: any;
    /**
     * Get Lotacao with router parameters
     *
     * @type {Observable<any>}
     */
    getLotacao: Observable<any> = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new RootLotacaoEditActions.GetLotacaoFailed(err));
        })
    ));
    /**
     * Save Lotacao
     *
     * @type {Observable<any>}
     */
    saveLotacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RootLotacaoEditActions.SaveLotacao>(RootLotacaoEditActions.SAVE_LOTACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'lotação',
            content: 'Salvando a lotação ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._lotacaoService.save(action.payload.lotacao, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'lotação',
                    content: 'Lotação id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Lotacao) => [
                    new RootLotacaoEditActions.SaveLotacaoSuccess(),
                    new RootLotacaoListActions.ReloadLotacoes(),
                    new AddData<Lotacao>({data: [response], schema: lotacaoSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'lotação',
                        content: 'Erro ao salvar a lotação!',
                        status: 2, // erro
                    }));
                    return of(new RootLotacaoEditActions.SaveLotacaoFailed(err));
                })
            );
        })
    ));
    /**
     * Save Lotacao Success
     */
    saveLotacaoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RootLotacaoEditActions.SaveLotacaoSuccess>(RootLotacaoEditActions.SAVE_LOTACAO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.lotacaoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _lotacaoService: LotacaoService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
