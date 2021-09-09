import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DadosPessoaEditActions from '../actions/dados-pessoa-edit.actions';
import * as PessoaListActions from '../../../../pessoa-list/store/actions/pessoa-list.actions';

import {PessoaService} from '@cdk/services/pessoa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {pessoa as pessoaSchema} from '@cdk/normalizr';
import {Pessoa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DadosPessoaEditEffect {
    routerState: any;
    /**
     * Get Pessoa with router parameters
     *
     * @type {Observable<any>}
     */
    getPessoa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DadosPessoaEditActions.GetPessoa>(DadosPessoaEditActions.GET_PESSOA),
        switchMap(action => this._pessoaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Pessoa>({data: response['entities'], schema: pessoaSchema}),
            new DadosPessoaEditActions.GetPessoaSuccess({
                loaded: {
                    id: 'pessoaHandle',
                    value: this.routerState.params.pessoaHandle
                },
                pessoaId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DadosPessoaEditActions.GetPessoaFailed(err));
        })
    ));
    /**
     * Save Pessoa
     *
     * @type {Observable<any>}
     */
    savePessoa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DadosPessoaEditActions.SavePessoa>(DadosPessoaEditActions.SAVE_PESSOA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'pessoa',
            content: 'Salvando a pessoa ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._pessoaService.save(action.payload.pessoa).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'pessoa',
                content: 'Pessoa id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Pessoa) => [
                new DadosPessoaEditActions.SavePessoaSuccess({pessoa: response, select: action.payload.select}),
                new PessoaListActions.ReloadPessoas(),
                new AddData<Pessoa>({data: [response], schema: pessoaSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'pessoa',
                    content: 'Erro ao salvar a pessoa!',
                    status: 2, // erro
                }));
                return of(new DadosPessoaEditActions.SavePessoaFailed(err));
            })
        ))
    ));
    /**
     * Save Pessoa Success
     */
    savePessoaSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DadosPessoaEditActions.SavePessoaSuccess>(DadosPessoaEditActions.SAVE_PESSOA_SUCCESS),
        tap((action) => {
            this._router.navigate([this.routerState.url.replace('criar/dados-pessoa', action.payload.pessoa.id + '/documentos/listar')])
                .then(() => {
                    if (action.payload.select) {
                        this._router.navigate([this.routerState.url.split('/pessoa')[0]])
                            .then(() => {
                            });
                    }
                });
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _pessoaService: PessoaService,
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
