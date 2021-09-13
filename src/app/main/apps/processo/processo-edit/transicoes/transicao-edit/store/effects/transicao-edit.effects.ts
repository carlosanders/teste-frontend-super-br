import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TransicaoEditActions from '../actions/transicao-edit.actions';
import * as TransicaoListActions from '../../../transicao-list/store/actions/transicao-list.actions';

import {TransicaoService} from '@cdk/services/transicao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr';
import {Transicao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TransicaoEditEffect {
    routerState: any;
    /**
     * Get Transicao with router parameters
     *
     * @type {Observable<any>}
     */
    getTransicao: any = createEffect(() => this._actions.pipe(
        ofType<TransicaoEditActions.GetTransicao>(TransicaoEditActions.GET_TRANSICAO),
        switchMap(action => this._transicaoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Transicao>({data: response['entities'], schema: transicaoSchema}),
            new TransicaoEditActions.GetTransicaoSuccess({
                loaded: {
                    id: 'transicaoHandle',
                    value: this.routerState.params.transicaoHandle
                },
                transicaoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TransicaoEditActions.GetTransicaoFailed(err));
        })
    ));
    /**
     * Save Transicao
     *
     * @type {Observable<any>}
     */
    saveTransicao: any = createEffect(() => this._actions.pipe(
        ofType<TransicaoEditActions.SaveTransicao>(TransicaoEditActions.SAVE_TRANSICAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'transição',
            content: 'Salvando a transição ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._transicaoService.save(action.payload.transicao).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'transição',
                content: 'Transição id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Transicao) => [
                new TransicaoEditActions.SaveTransicaoSuccess(),
                new TransicaoListActions.ReloadTransicoes(),
                new AddData<Transicao>({data: [response], schema: transicaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'transição',
                    content: 'Erro ao salvar a transição!',
                    status: 2, // erro
                }));
                return of(new TransicaoEditActions.SaveTransicaoFailed(err));
            })
        ))
    ));
    /**
     * Save Transicao Success
     */
    saveTransicaoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TransicaoEditActions.SaveTransicaoSuccess>(TransicaoEditActions.SAVE_TRANSICAO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.transicaoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
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
