import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EnderecoEditActions from '../actions/endereco-edit.actions';
import * as EnderecoListActions from '../../../endereco-list/store/actions/endereco-list.actions';

import {EnderecoService} from '@cdk/services/endereco.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {endereco as enderecoSchema} from '@cdk/normalizr';
import {Endereco} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EnderecoEditEffect {
    routerState: any;
    /**
     * Get Endereco with router parameters
     *
     * @type {Observable<any>}
     */
    getEndereco: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EnderecoEditActions.GetEndereco>(EnderecoEditActions.GET_ENDERECO),
        switchMap(action => this._enderecoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Endereco>({data: response['entities'], schema: enderecoSchema}),
            new EnderecoEditActions.GetEnderecoSuccess({
                loaded: {
                    id: 'enderecoHandle',
                    value: this.routerState.params.enderecoHandle
                },
                enderecoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EnderecoEditActions.GetEnderecoFailed(err));
        })
    ));
    /**
     * Save Endereco
     *
     * @type {Observable<any>}
     */
    saveEndereco: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EnderecoEditActions.SaveEndereco>(EnderecoEditActions.SAVE_ENDERECO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'endereço',
            content: 'Salvando o endereço ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._enderecoService.save(action.payload.endereco).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'endereço',
                content: 'Endereço id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Endereco) => [
                new EnderecoEditActions.SaveEnderecoSuccess(),
                new EnderecoListActions.ReloadEnderecos(),
                new AddData<Endereco>({data: [response], schema: enderecoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'endereço',
                    content: 'Erro ao salvar o endereço!',
                    status: 2, // erro
                }));
                return of(new EnderecoEditActions.SaveEnderecoFailed(err));
            })
        ))
    ));
    /**
     * Save Endereco Success
     */
    saveEnderecoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<EnderecoEditActions.SaveEnderecoSuccess>(EnderecoEditActions.SAVE_ENDERECO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.enderecoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _enderecoService: EnderecoService,
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
