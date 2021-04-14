import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as ContatoEditActions from '../actions/contato-edit.actions';
import * as ContatoListActions from '../../../contato-list/store/actions/contato-list.actions';

import {ContatoService} from '@cdk/services/contato.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {contato as contatoSchema} from '@cdk/normalizr';
import {Contato} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ContatoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _contatoService: ContatoService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
     * Get Contato with router parameters
     * @type {Observable<any>}
     */
    getContato: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContatoEditActions.GetContato>(ContatoEditActions.GET_CONTATO),
                switchMap((action) => {
                    return this._contatoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Contato>({data: response['entities'], schema: contatoSchema}),
                    new ContatoEditActions.GetContatoSuccess({
                        loaded: {
                            id: 'contatoHandle',
                            value: this.routerState.params.contatoHandle
                        },
                        contatoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ContatoEditActions.GetContatoFailed(err));
                    return caught;
                })
            )
    })

    /**
     * Save Contato
     * @type {Observable<any>}
     */
    saveContato: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContatoEditActions.SaveContato>(ContatoEditActions.SAVE_CONTATO),
                switchMap((action) => {
                    return this._contatoService.save(action.payload).pipe(
                        mergeMap((response: Contato) => [
                            new ContatoEditActions.SaveContatoSuccess(),
                            new ContatoListActions.ReloadContato(),
                            new AddData<Contato>({data: [response], schema: contatoSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new ContatoEditActions.SaveContatoFailed(err));
                    return caught;
                })
            )
    })

    /**
     * Save Contato Success
     */
    saveContatoSuccess: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContatoEditActions.SaveContatoSuccess>(ContatoEditActions.SAVE_CONTATO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.contatoHandle), 'listar')]).then();
                })
            )
    }, {dispatch: false});
}
