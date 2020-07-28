import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as EnderecoListActions from '../actions';

import {EnderecoService} from '@cdk/services/endereco.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Endereco} from '@cdk/models';
import {endereco as enderecoSchema} from '@cdk/normalizr';

@Injectable()
export class EnderecoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _enderecoService: EnderecoService,
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
     * Get Enderecos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEnderecos: any =
        this._actions
            .pipe(
                ofType<EnderecoListActions.GetEnderecos>(EnderecoListActions.GET_ENDERECOS),
                switchMap((action) => {
                    return this._enderecoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify([
                            'municipio', 'municipio.estado', 'pais', 'pessoa'
                        ]));
                }),
                mergeMap((response) => [
                    new AddData<Endereco>({data: response['entities'], schema: enderecoSchema}),
                    new EnderecoListActions.GetEnderecosSuccess({
                        entitiesId: response['entities'].map(endereco => endereco.id),
                        loaded: {
                            id: 'pessoaHandle',
                            value: this.routerState.params.pessoaHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new EnderecoListActions.GetEnderecosFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Endereco
     * @type {Observable<any>}
     */
    @Effect()
    deleteEndereco: any =
        this._actions
            .pipe(
                ofType<EnderecoListActions.DeleteEndereco>(EnderecoListActions.DELETE_ENDERECO),
                mergeMap((action) => {
                    return this._enderecoService.destroy(action.payload).pipe(
                        map((response) => new EnderecoListActions.DeleteEnderecoSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new EnderecoListActions.DeleteEnderecoFailed(action.payload));
                        })
                    );
                })
            );
}
