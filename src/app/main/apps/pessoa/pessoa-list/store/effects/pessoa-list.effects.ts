import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as PessoaListActions from 'app/main/apps/pessoa/pessoa-list/store/actions';

import {PessoaService} from '@cdk/services/pessoa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

@Injectable()
export class PessoaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _pessoaService: PessoaService,
        private _store: Store<State>
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
     * Get Pessoas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getPessoas: any =
        this._actions
            .pipe(
                ofType<PessoaListActions.GetPessoas>(PessoaListActions.GET_PESSOAS),
                switchMap((action) => {
                    return this._pessoaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                mergeMap((response) => [
                    new AddData<Pessoa>({data: response['entities'], schema: pessoaSchema}),
                    new PessoaListActions.GetPessoasSuccess({
                        entitiesId: response['entities'].map(pessoa => pessoa.id),
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new PessoaListActions.GetPessoasFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Pessoa
     * @type {Observable<any>}
     */
    @Effect()
    deletePessoa: any =
        this._actions
            .pipe(
                ofType<PessoaListActions.DeletePessoa>(PessoaListActions.DELETE_PESSOA),
                mergeMap((action) => {
                    return this._pessoaService.destroy(action.payload).pipe(
                        map((response) => new PessoaListActions.DeletePessoaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new PessoaListActions.DeletePessoaFailed(action.payload));
                        })
                    );
                })
            );
}
