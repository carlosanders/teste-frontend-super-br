import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as VinculacaoPessoaBarramentoEditActions from '../actions/vinculacao-pessoa-barramento-edit.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as VinculacaoPessoaBarramentoListActions
    from '../../../../../../pessoa/pessoa-edit/vinculacao-pessoa-barramento/vinculacao-pessoa-barramento-list/store/actions';
import {VinculacaoPessoaBarramento} from '@cdk/models/vinculacao-pessoa-barramento';
import {vinculacaoPessoaBarramento as vinculacaoPessoaBarramentoSchema} from '@cdk/normalizr/index';
import {VinculacaoPessoaBarramentoService} from '@cdk/services/vinculacao-pessoa-barramento.service';

@Injectable()
export class VinculacaoPessoaBarramentoEditEffect {
    routerState: any;
    /**
     * Get VinculacaoPessoaBarramento with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacaoPessoaBarramento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaBarramentoEditActions.GetVinculacaoPessoaBarramento>(VinculacaoPessoaBarramentoEditActions.GET_VINCULACAO_PESSOA_BARRAMENTO),
        switchMap(action => this._vinculacaoPessoaBarramentoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<VinculacaoPessoaBarramento>({
                data: response['entities'],
                schema: vinculacaoPessoaBarramentoSchema
            }),
            new VinculacaoPessoaBarramentoEditActions.GetVinculacaoPessoaBarramentoSuccess({
                loaded: {
                    id: 'vinculacaoPessoaBarramentoHandle',
                    value: this.routerState.params.vinculacaoPessoaBarramentoHandle
                },
                vinculacaoPessoaBarramentoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VinculacaoPessoaBarramentoEditActions.GetVinculacaoPessoaBarramentoFailed(err));
        })
    ));
    /**
     * Save VinculacaoPessoaBarramento
     *
     * @type {Observable<any>}
     */
    saveVinculacaoPessoaBarramento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramento>(VinculacaoPessoaBarramentoEditActions.SAVE_VINCULACAO_PESSOA_BARRAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação pessoa barramento',
            content: 'Salvando a vinculação pessoa barramento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoPessoaBarramentoService.save(action.payload.vinculacaoPessoaBarramento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'vinculação pessoa barramento',
                content: 'Vinculação pessoa barramento id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: VinculacaoPessoaBarramento) => [
                new VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramentoSuccess(),
                new VinculacaoPessoaBarramentoListActions.ReloadVinculacaoPessoaBarramentos(),
                new AddData<VinculacaoPessoaBarramento>({data: [response], schema: vinculacaoPessoaBarramentoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação pessoa barramento',
                    content: 'Erro ao salvar a vinculação pessoa barramento!',
                    status: 2, // erro
                }));
                return of(new VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramentoFailed(err));
            })
        ))
    ));
    /**
     * Save VinculacaoPessoaBarramento Success
     */
    saveVinculacaoPessoaBarramentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaBarramentoEditActions.SaveVinculacaoPessoaBarramentoSuccess>(VinculacaoPessoaBarramentoEditActions.SAVE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('vinculacao-pessoa-barramento/'), 'vinculacao-pessoa-barramento/listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaBarramentoService: VinculacaoPessoaBarramentoService,
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
