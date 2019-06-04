import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as AssuntoEditActions from '../actions/assunto-edit.actions';
import * as AssuntoListActions from '../../../assunto-list/store/actions/assunto-list.actions';

import {AssuntoService} from '@cdk/services/assunto.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema} from '@cdk/normalizr/assunto.schema';
import {Assunto} from '@cdk/models/assunto.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class AssuntoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _assuntoService: AssuntoService,
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
     * Get Assunto with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAssunto: any =
        this._actions
            .pipe(
                ofType<AssuntoEditActions.GetAssunto>(AssuntoEditActions.GET_ASSUNTO),
                switchMap((action) => {
                    return this._assuntoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
                    new AssuntoEditActions.GetAssuntoSuccess({
                        loaded: {
                            id: 'assuntoHandle',
                            value: this.routerState.params.assuntoHandle
                        },
                        assuntoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssuntoEditActions.GetAssuntoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Assunto
     * @type {Observable<any>}
     */
    @Effect()
    saveAssunto: any =
        this._actions
            .pipe(
                ofType<AssuntoEditActions.SaveAssunto>(AssuntoEditActions.SAVE_ASSUNTO),
                switchMap((action) => {
                    return this._assuntoService.save(action.payload).pipe(
                        mergeMap((response: Assunto) => [
                            new AssuntoEditActions.SaveAssuntoSuccess(),
                            new AssuntoListActions.ReloadAssuntos(),
                            new AddData<Assunto>({data: [response], schema: assuntoSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssuntoEditActions.SaveAssuntoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Assunto Success
     */
    @Effect({dispatch: false})
    saveAssuntoSuccess: any =
        this._actions
            .pipe(
                ofType<AssuntoEditActions.SaveAssuntoSuccess>(AssuntoEditActions.SAVE_ASSUNTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.assuntoHandle), 'listar')]).then();
                })
            );
}
