import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as EnderecoEditActions from '../actions/endereco-edit.actions';
import * as EnderecoListActions from '../../../endereco-list/store/actions/endereco-list.actions';

import {EnderecoService} from '@cdk/services/endereco.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {endereco as enderecoSchema} from '@cdk/normalizr/endereco.schema';
import {Endereco} from '@cdk/models/endereco.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EnderecoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _enderecoService: EnderecoService,
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
     * Get Endereco with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEndereco: any =
        this._actions
            .pipe(
                ofType<EnderecoEditActions.GetEndereco>(EnderecoEditActions.GET_ENDERECO),
                switchMap((action) => {
                    return this._enderecoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EnderecoEditActions.GetEnderecoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Endereco
     * @type {Observable<any>}
     */
    @Effect()
    saveEndereco: any =
        this._actions
            .pipe(
                ofType<EnderecoEditActions.SaveEndereco>(EnderecoEditActions.SAVE_ENDERECO),
                switchMap((action) => {
                    return this._enderecoService.save(action.payload).pipe(
                        mergeMap((response: Endereco) => [
                            new EnderecoEditActions.SaveEnderecoSuccess(),
                            new EnderecoListActions.ReloadEnderecos(),
                            new AddData<Endereco>({data: [response], schema: enderecoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'endereco',
                                content: `Endereco id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new EnderecoEditActions.SaveEnderecoFailed(err));
                        })
                    );
                })
            );
    /**
     * Save Endereco Success
     */
    @Effect({dispatch: false})
    saveEnderecoSuccess: any =
        this._actions
            .pipe(
                ofType<EnderecoEditActions.SaveEnderecoSuccess>(EnderecoEditActions.SAVE_ENDERECO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.enderecoHandle), 'listar')]).then();
                })
            );
}
