import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as ModalidadeOrgaoCentralListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ModalidadeOrgaoCentral} from '@cdk/models';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from '@cdk/normalizr';

@Injectable()
export class ModalidadeOrgaoCentralListEffects {
    routerState: any;
    /**
     * Get ModalidadeOrgaoCentral with router parameters
     *
     * @type {Observable<any>}
     */
    getModalidadeOrgaoCentral: any = createEffect(() => this._actions.pipe(
        ofType<ModalidadeOrgaoCentralListActions.GetModalidadeOrgaoCentral>(ModalidadeOrgaoCentralListActions.GET_MODALIDADE_ORGAO_CENTRAL),
        switchMap(action => this._modalidadeOrgaoCentralService.query(
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
                new AddData<ModalidadeOrgaoCentral>({
                    data: response['entities'],
                    schema: modalidadeOrgaoCentralSchema
                }),
                new ModalidadeOrgaoCentralListActions.GetModalidadeOrgaoCentralSuccess({
                    entitiesId: response['entities'].map(modalidadeOrgaoCentral => modalidadeOrgaoCentral.id),
                    loaded: {
                        id: 'modalidadeOrgaoCentralHandle',
                        value: this.routerState.params.modalidadeOrgaoCentralHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ModalidadeOrgaoCentralListActions.GetModalidadeOrgaoCentralFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
