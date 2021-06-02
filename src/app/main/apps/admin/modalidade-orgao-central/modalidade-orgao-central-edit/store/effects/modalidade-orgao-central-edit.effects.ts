import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ModalidadeOrgaoCentralEditActions from '../actions/modalidade-orgao-central-edit.actions';
import * as ModalidadeOrgaoCentralListActions
    from '../../../modalidade-orgao-central-list/store/actions/modalidade-orgao-central-list.actions';

import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from '@cdk/normalizr';
import {ModalidadeOrgaoCentral} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ModalidadeOrgaoCentralEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
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
     * Get ModalidadeOrgaoCentral with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getModalidadeOrgaoCentral: any =
        this._actions
            .pipe(
                ofType<ModalidadeOrgaoCentralEditActions.GetModalidadeOrgaoCentral>(ModalidadeOrgaoCentralEditActions.GET_MODALIDADE_ORGAO_CENTRAL),
                switchMap(action => this._modalidadeOrgaoCentralService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<ModalidadeOrgaoCentral>({data: response['entities'], schema: modalidadeOrgaoCentralSchema}),
                    new ModalidadeOrgaoCentralEditActions.GetModalidadeOrgaoCentralSuccess({
                        loaded: {
                            id: 'modalidadeOrgaoCentralHandle',
                            value: this.routerState.params.modalidadeOrgaoCentralHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModalidadeOrgaoCentralEditActions.GetModalidadeOrgaoCentralFailed(err));
                    return caught;
                })
            );

    /**
     * Save ModalidadeOrgaoCentral
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveModalidadeOrgaoCentral: any =
        this._actions
            .pipe(
                ofType<ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentral>(ModalidadeOrgaoCentralEditActions.SAVE_MODALIDADE_ORGAO_CENTRAL),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._modalidadeOrgaoCentralService.save(action.payload, context).pipe(
                        mergeMap((response: ModalidadeOrgaoCentral) => [
                            new ModalidadeOrgaoCentralListActions.ReloadModalidadeOrgaoCentral(),
                            new AddData<ModalidadeOrgaoCentral>({data: [response], schema: modalidadeOrgaoCentralSchema}),
                            new ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentralSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentralFailed(err));
                    return caught;
                })
            );

    /**
     * Update ModalidadeOrgaoCentral
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateModalidadeOrgaoCentral: any =
        this._actions
            .pipe(
                ofType<ModalidadeOrgaoCentralEditActions.UpdateModalidadeOrgaoCentral>(ModalidadeOrgaoCentralEditActions.UPDATE_MODALIDADE_ORGAO_CENTRAL),
                switchMap(action => this._modalidadeOrgaoCentralService.patch(action.payload.modalidadeOrgaoCentral, action.payload.changes).pipe(
                        mergeMap((response: ModalidadeOrgaoCentral) => [
                            new ModalidadeOrgaoCentralListActions.ReloadModalidadeOrgaoCentral(),
                            new AddData<ModalidadeOrgaoCentral>({data: [response], schema: modalidadeOrgaoCentralSchema}),
                            new ModalidadeOrgaoCentralEditActions.UpdateModalidadeOrgaoCentralSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModalidadeOrgaoCentralEditActions.UpdateModalidadeOrgaoCentralFailed(err));
                    return caught;
                })
            );

    /**
     * Save ModalidadeOrgaoCentral Success
     */
    @Effect({dispatch: false})
    saveModalidadeOrgaoCentralSuccess: any =
        this._actions
            .pipe(
                ofType<ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentralSuccess>(ModalidadeOrgaoCentralEditActions.SAVE_MODALIDADE_ORGAO_CENTRAL_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/modalidade-orgao-central/listar']).then();
                })
            );

}
