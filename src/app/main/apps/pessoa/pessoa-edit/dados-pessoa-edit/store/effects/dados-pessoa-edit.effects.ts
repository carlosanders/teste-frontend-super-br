import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as DadosPessoaEditActions from '../actions/dados-pessoa-edit.actions';
import * as PessoaListActions from '../../../../pessoa-list/store/actions/pessoa-list.actions';

import {PessoaService} from '@cdk/services/pessoa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {pessoa as pessoaSchema} from '@cdk/normalizr/pessoa.schema';
import {Pessoa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DadosPessoaEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _pessoaService: PessoaService,
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
     * Get Pessoa with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getPessoa: any =
        this._actions
            .pipe(
                ofType<DadosPessoaEditActions.GetPessoa>(DadosPessoaEditActions.GET_PESSOA),
                switchMap((action) => {
                    return this._pessoaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DadosPessoaEditActions.GetPessoaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Pessoa
     * @type {Observable<any>}
     */
    @Effect()
    savePessoa: any =
        this._actions
            .pipe(
                ofType<DadosPessoaEditActions.SavePessoa>(DadosPessoaEditActions.SAVE_PESSOA),
                switchMap((action) => {
                    return this._pessoaService.save(action.payload).pipe(
                        mergeMap((response: Pessoa) => [
                            new DadosPessoaEditActions.SavePessoaSuccess(response),
                            new PessoaListActions.ReloadPessoas(),
                            new AddData<Pessoa>({data: [response], schema: pessoaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'pessoa',
                                content: `Pessoa id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new DadosPessoaEditActions.SavePessoaFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Pessoa Success
     */
    @Effect({dispatch: false})
    savePessoaSuccess: any =
        this._actions
            .pipe(
                ofType<DadosPessoaEditActions.SavePessoaSuccess>(DadosPessoaEditActions.SAVE_PESSOA_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace('dados-pessoa', 'documentos/listar').replace('criar', action.payload.id)]).then();
                })
            );
}
