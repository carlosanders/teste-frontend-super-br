import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ContatoListActions from '../actions';

import {ContatoService} from '@cdk/services/contato.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Contato} from '@cdk/models';
import {contato as contatoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../../@cdk/utils';

@Injectable()
export class ContatoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _contatoService: ContatoService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    /**
     * Get Contato with router parameters
     *
     * @type {Observable<any>}
     */
    getContato: any = createEffect(() => this._actions
            .pipe(
                ofType<ContatoListActions.GetContato>(ContatoListActions.GET_CONTATOS),
                switchMap(action => this._contatoService.query(
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
                            new AddData<Contato>({data: response['entities'], schema: contatoSchema}),
                            new ContatoListActions.GetContatoSuccess({
                                entitiesId: response['entities'].map(contato => contato.id),
                                loaded: {
                                    id: 'grupoContatoHandle',
                                    value: response['entities'][0]
                                },
                                total: response['total']
                            })
                        ]),
                        catchError(err => of(new ContatoListActions.GetContatoFailed(err)))
                    ))
            ));

    /**
     * Delete Contato
     *
     * @type {Observable<any>}
     */
    deleteContato: any = createEffect(() => this._actions
            .pipe(
                ofType<ContatoListActions.DeleteContato>(ContatoListActions.DELETE_CONTATO),
                mergeMap(action => this._contatoService.destroy(action.payload).pipe(
                        map(response => new ContatoListActions.DeleteContatoSuccess(response.id)),
                        catchError(err => of(new ContatoListActions.DeleteContatoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            ))
                    ))
            ));
}
