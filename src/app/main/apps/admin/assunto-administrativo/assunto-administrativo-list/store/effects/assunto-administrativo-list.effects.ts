import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as AssuntoAdministrativoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {AssuntoAdministrativoService} from '../../../../../../../../@cdk/services/assunto-administrativo.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {AssuntoAdministrativo} from '../../../../../../../../@cdk/models';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '../../../../../../../../@cdk/normalizr';


@Injectable()
export class AssuntoAdministrativoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _assuntoAdministrativoService: AssuntoAdministrativoService,
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
     * Get AssuntoAdministrativo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntoAdministrativo: any =
        this._actions
            .pipe(
                ofType<AssuntoAdministrativoListActions.GetAssuntoAdministrativo>(AssuntoAdministrativoListActions.GET_ASSUNTO_ADMINISTRATIVO),
                switchMap((action) => {
                    return this._assuntoAdministrativoService.query(
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
                            new AddData<AssuntoAdministrativo>({data: response['entities'], schema: assuntoAdministrativoSchema}),
                            new AssuntoAdministrativoListActions.GetAssuntoAdministrativoSuccess({
                                entitiesId: response['entities'].map(assuntoAdministrativo => assuntoAdministrativo.id),
                                loaded: {
                                    id: 'assuntoAdministrativoHandle',
                                    value: this.routerState.params.assuntoAdministrativoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AssuntoAdministrativoListActions.GetAssuntoAdministrativoFailed(err));
                        })
                    );
                })
            );


}