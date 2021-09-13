import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as LotacaoEditActions from '../actions/coordenador-lotacao-edit.actions';
import * as LotacaoListActions from '../../../lotacao-list/store/actions';

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
export class CoordenadorLotacaoEditEffects {
    routerState: any;
    /**
     * Get Lotacao with router parameters
     *
     * @type {Observable<any>}
     */
    getLotacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LotacaoEditActions.GetLotacao>(LotacaoEditActions.GET_LOTACAO),
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
            new LotacaoEditActions.GetLotacaoSuccess({
                loaded: {
                    id: 'lotacaoHandle',
                    value: this.routerState.params.lotacaoHandle
                },
                lotacaoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new LotacaoEditActions.GetLotacaoFailed(err));
        })
    ));
    /**
     * Save Lotacao
     *
     * @type {Observable<any>}
     */
    saveLotacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LotacaoEditActions.SaveLotacao>(LotacaoEditActions.SAVE_LOTACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'lotação',
            content: 'Salvando a lotação ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._lotacaoService.save(action.payload.lotacao).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'lotação',
                content: 'Lotação id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Lotacao) => [
                new LotacaoEditActions.SaveLotacaoSuccess(),
                new LotacaoListActions.ReloadLotacoes(),
                new AddData<Lotacao>({data: [response], schema: lotacaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'lotação',
                    content: 'Erro ao salvar o lotação!',
                    status: 2, // erro
                }));
                return of(new LotacaoEditActions.SaveLotacaoFailed(err));
            })
        ))
    ));
    /**
     * Save Lotacao Success
     */
    saveLotacaoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LotacaoEditActions.SaveLotacaoSuccess>(LotacaoEditActions.SAVE_LOTACAO_SUCCESS),
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
