import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store/reducers';
import * as ServidorEmailListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ServidorEmailService} from '@cdk/services/servidor-email.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ServidorEmail} from '@cdk/models';
import {servidorEmail as servidorEmailSchema} from '@cdk/normalizr';


@Injectable()
export class ServidorEmailListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _servidorEmailService: ServidorEmailService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get ServidorEmail with router parameters
     *
     * @type {Observable<any>}
     */
    getServidorEmail: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ServidorEmailListActions.GetServidorEmail>(ServidorEmailListActions.GET_SERVIDOR_EMAIL),
                switchMap(action => this._servidorEmailService.query(
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
                        new AddData<ServidorEmail>({data: response['entities'], schema: servidorEmailSchema}),
                        new ServidorEmailListActions.GetServidorEmailSuccess({
                            entitiesId: response['entities'].map(servidorEmail => servidorEmail.id),
                            loaded: {
                                id: 'servidorEmailHandle',
                                value: this.routerState.params['servidorEmailHandle']
                            },
                            total: response['total']
                        })
                    ]),
                    catchError((err) => {
                        return of(new ServidorEmailListActions.GetServidorEmailFailed(err));
                    })
                ))
            );
    });
}
