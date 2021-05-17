import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as ModalidadeAcaoEtiquetaListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';


@Injectable()
export class ModalidadeAcaoEtiquetaListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _modalidadeAcaoEtiquetaService: ModalidadeAcaoEtiquetaService,
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
     * Get ModalidadeAcaoEtiqueta with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getModalidadeAcaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaListActions.GetModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaListActions.GET_MODALIDADE_ACAO_ETIQUETA),
                switchMap((action) => {
                    return this._modalidadeAcaoEtiquetaService.query(
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
                            new AddData<ModalidadeAcaoEtiqueta>({data: response['entities'], schema: modalidadeAcaoEtiquetaSchema}),
                            new ModalidadeAcaoEtiquetaListActions.GetModalidadeAcaoEtiquetaSuccess({
                                entitiesId: response['entities'].map(modalidadeAcaoEtiqueta => modalidadeAcaoEtiqueta.id),
                                loaded: {
                                    id: 'modalidadeAcaoEtiquetaHandle',
                                    value: this.routerState.params.modalidadeAcaoEtiquetaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ModalidadeAcaoEtiquetaListActions.GetModalidadeAcaoEtiquetaFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete ModalidadeAcaoEtiqueta
     * @type {Observable<any>}
     */
    @Effect()
    deleteModalidadeAcaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaListActions.DeleteModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaListActions.DELETE_MODALIDADE_ACAO_ETIQUETA),
                mergeMap((action) => {
                    return this._modalidadeAcaoEtiquetaService.destroy(action.payload).pipe(
                        map((response) => new ModalidadeAcaoEtiquetaListActions.DeleteModalidadeAcaoEtiquetaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new ModalidadeAcaoEtiquetaListActions.DeleteModalidadeAcaoEtiquetaFailed(action.payload));
                        })
                    );
                })
            );
}
