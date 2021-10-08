import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store';
import * as ContaEmailListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ContaEmailService} from '@cdk/services/conta-email.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ContaEmail} from '@cdk/models';
import {contaEmail as contaEmailSchema} from '@cdk/normalizr';


@Injectable()
export class ContaEmailListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _contaEmailService: ContaEmailService,
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
     * Get ContaEmail with router parameters
     *
     * @type {Observable<any>}
     */
    getContaEmail: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContaEmailListActions.GetContaEmail>(ContaEmailListActions.GET_CONTA_EMAIL),
                switchMap(action => this._contaEmailService.query(
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
                        new AddData<ContaEmail>({data: response['entities'], schema: contaEmailSchema}),
                        new ContaEmailListActions.GetContaEmailSuccess({
                            entitiesId: response['entities'].map(contaEmail => contaEmail.id),
                            loaded: {
                                id: 'contaEmailHandle',
                                value: this.routerState.params['contaEmailHandle']
                            },
                            total: response['total']
                        })
                    ]),
                    catchError((err) => {
                        return of(new ContaEmailListActions.GetContaEmailFailed(err));
                    })
                ))
            );
    });
}
