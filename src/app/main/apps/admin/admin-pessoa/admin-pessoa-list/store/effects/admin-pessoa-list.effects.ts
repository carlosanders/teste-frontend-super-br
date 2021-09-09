import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as PessoaListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {PessoaService} from '@cdk/services/pessoa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

@Injectable()
export class AdminPessoaListEffects {
    routerState: any;
    /**
     * Get Pessoa with router parameters
     *
     * @type {Observable<any>}
     */
    getPessoa: any = createEffect(() => this._actions.pipe(
        ofType<PessoaListActions.GetPessoa>(PessoaListActions.GET_PESSOA),
        switchMap(action => this._pessoaService.search(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<Pessoa>({data: response['entities'], schema: pessoaSchema}),
                new PessoaListActions.GetPessoaSuccess({
                    entitiesId: response['entities'].map(pessoa => pessoa.id),
                    loaded: {
                        id: 'pessoaHandle',
                        value: this.routerState.params.pessoaHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new PessoaListActions.GetPessoaFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _pessoaService: PessoaService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
