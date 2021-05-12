import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store';
import * as AvisoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {AvisoService} from '../../../../../../../../@cdk/services/aviso.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {Aviso} from '../../../../../../../../@cdk/models';
import {aviso as avisoSchema} from '../../../../../../../../@cdk/normalizr';


@Injectable()
export class AvisoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _avisoService: AvisoService,
        private _loginService: LoginService,
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
     * Get Aviso with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAviso: any =
        this._actions
            .pipe(
                ofType<AvisoListActions.GetAviso>(AvisoListActions.GET_AVISO),
                switchMap((action) => {
                    return this._avisoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [

                            new AddData<Aviso>({data: response['entities'], schema: avisoSchema}),
                            new AvisoListActions.GetAvisoSuccess({

                                entitiesId: response['entities'].map(aviso => aviso.id),
                                loaded: {
                                    id: 'avisoHandle',
                                    value: this.routerState.params.avisoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AvisoListActions.GetAvisoFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Aviso
     * @type {Observable<any>}
     */
    @Effect()
    deleteAviso: any =
        this._actions
            .pipe(
                ofType<AvisoListActions.DeleteAviso>(AvisoListActions.DELETE_AVISO),
                mergeMap((action) => {
                    return this._avisoService.destroy(action.payload).pipe(
                        map((response) => new AvisoListActions.DeleteAvisoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new AvisoListActions.DeleteAvisoFailed(action.payload));
                        })
                    );
                })
            );
}
