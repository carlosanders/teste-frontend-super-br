import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as PessoaEditActions from '../actions/admin-pessoa-edit.actions';
import * as PessoaListActions from '../../../admin-pessoa-list/store/actions/admin-pessoa-list.actions';

import {PessoaService} from '@cdk/services/pessoa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {pessoa as pessoaSchema} from '@cdk/normalizr';
import {Pessoa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AdminPessoaEditEffects {
    routerState: any;
    /**
     * Get Pessoa with router parameters
     *
     * @type {Observable<any>}
     */
    getPessoa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<PessoaEditActions.GetPessoa>(PessoaEditActions.GET_PESSOA),
        switchMap(action => this._pessoaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Pessoa>({data: response['entities'], schema: pessoaSchema}),
            new PessoaEditActions.GetPessoaSuccess({
                loaded: {
                    id: 'pessoaHandle',
                    value: this.routerState.params.pessoaHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new PessoaEditActions.GetPessoaFailed(err));
        })
    ));
    /**
     * Save Pessoa
     *
     * @type {Observable<any>}
     */
    savePessoa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<PessoaEditActions.SavePessoa>(PessoaEditActions.SAVE_PESSOA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'pessoa',
            content: 'Salvando a pessoa ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._pessoaService.save(action.payload.pessoa, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'pessoa',
                    content: 'Pessoa id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Pessoa) => [
                    new PessoaEditActions.SavePessoaSuccess(response),
                    new PessoaListActions.ReloadPessoa(),
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
                    return of(new PessoaEditActions.SavePessoaFailed(err));
                })
            );
        })
    ));
    /**
     * Save Pessoa Success
     */
    savePessoaSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<PessoaEditActions.SavePessoaSuccess>(PessoaEditActions.SAVE_PESSOA_SUCCESS),
        tap((action) => {
            this._router.navigate(['apps/admin/pessoas/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _pessoaService: PessoaService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
