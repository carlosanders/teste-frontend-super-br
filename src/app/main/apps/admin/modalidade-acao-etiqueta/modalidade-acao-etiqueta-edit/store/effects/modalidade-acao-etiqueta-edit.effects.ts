import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as ModalidadeAcaoEtiquetaEditActions from '../actions/modalidade-acao-etiqueta-edit.actions';
import * as ModalidadeAcaoEtiquetaListActions
    from '../../../modalidade-acao-etiqueta-list/store/actions/modalidade-acao-etiqueta-list.actions';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ModalidadeAcaoEtiquetaEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _modalidadeAcaoEtiquetaService: ModalidadeAcaoEtiquetaService,
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
     * Get ModalidadeAcaoEtiqueta with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getModalidadeAcaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaEditActions.GetModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaEditActions.GET_MODALIDADE_ACAO_ETIQUETA),
                switchMap(action => this._modalidadeAcaoEtiquetaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<ModalidadeAcaoEtiqueta>({data: response['entities'], schema: modalidadeAcaoEtiquetaSchema}),
                    new ModalidadeAcaoEtiquetaEditActions.GetModalidadeAcaoEtiquetaSuccess({
                        loaded: {
                            id: 'modalidadeAcaoEtiquetaHandle',
                            value: this.routerState.params.modalidadeAcaoEtiquetaHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModalidadeAcaoEtiquetaEditActions.GetModalidadeAcaoEtiquetaFailed(err));
                    return caught;
                })
            );

    /**
     * Save ModalidadeAcaoEtiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveModalidadeAcaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaEditActions.SaveModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaEditActions.SAVE_MODALIDADE_ACAO_ETIQUETA),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._modalidadeAcaoEtiquetaService.save(action.payload, context).pipe(
                        mergeMap((response: ModalidadeAcaoEtiqueta) => [
                            new ModalidadeAcaoEtiquetaListActions.ReloadModalidadeAcaoEtiqueta(),
                            new AddData<ModalidadeAcaoEtiqueta>({data: [response], schema: modalidadeAcaoEtiquetaSchema}),
                            new ModalidadeAcaoEtiquetaEditActions.SaveModalidadeAcaoEtiquetaSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModalidadeAcaoEtiquetaEditActions.SaveModalidadeAcaoEtiquetaFailed(err));
                    return caught;
                })
            );

    /**
     * Update ModalidadeAcaoEtiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateModalidadeAcaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaEditActions.UpdateModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaEditActions.UPDATE_MODALIDADE_ACAO_ETIQUETA),
                switchMap(action => this._modalidadeAcaoEtiquetaService.patch(action.payload.modalidadeAcaoEtiqueta, action.payload.changes).pipe(
                        mergeMap((response: ModalidadeAcaoEtiqueta) => [
                            new ModalidadeAcaoEtiquetaListActions.ReloadModalidadeAcaoEtiqueta(),
                            new AddData<ModalidadeAcaoEtiqueta>({data: [response], schema: modalidadeAcaoEtiquetaSchema}),
                            new ModalidadeAcaoEtiquetaEditActions.UpdateModalidadeAcaoEtiquetaSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModalidadeAcaoEtiquetaEditActions.UpdateModalidadeAcaoEtiquetaFailed(err));
                    return caught;
                })
            );

    /**
     * Save ModalidadeAcaoEtiqueta Success
     */
    @Effect({dispatch: false})
    saveModalidadeAcaoEtiquetaSuccess: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaEditActions.SaveModalidadeAcaoEtiquetaSuccess>(ModalidadeAcaoEtiquetaEditActions.SAVE_MODALIDADE_ACAO_ETIQUETA_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/modalidade-acao-etiqueta/listar']).then();
                })
            );


}
