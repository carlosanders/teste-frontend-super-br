import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as PessoaEditActions from '../actions/admin-pessoa-edit.actions';
import * as PessoaListActions from '../../../admin-pessoa-list/store/actions/admin-pessoa-list.actions';

import {PessoaService} from '@cdk/services/pessoa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {pessoa as pessoaSchema} from '@cdk/normalizr/pessoa.schema';
import {Pessoa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class AdminPessoaEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _pessoaService: PessoaService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
                ofType<PessoaEditActions.GetPessoa>(PessoaEditActions.GET_PESSOA),
                switchMap((action) => {
                    return this._pessoaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new PessoaEditActions.GetPessoaFailed(err));
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
                ofType<PessoaEditActions.SavePessoa>(PessoaEditActions.SAVE_PESSOA),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._pessoaService.save(action.payload, context).pipe(
                        mergeMap((response: Pessoa) => [
                            new PessoaListActions.ReloadPessoa(),
                            new AddData<Pessoa>({data: [response], schema: pessoaSchema}),
                            new PessoaEditActions.SavePessoaSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new PessoaEditActions.SavePessoaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Pessoa Success
     */
    @Effect({dispatch: false})
    savePessoaSuccess: any =
        this._actions
            .pipe(
                ofType<PessoaEditActions.SavePessoaSuccess>(PessoaEditActions.SAVE_PESSOA_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/pessoas/listar']).then();
                })
            );

}
