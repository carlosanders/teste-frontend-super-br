import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';


import {AddData} from '@cdk/ngrx-normalizr';
import {acao as acaoSchema, modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';
import {Acao, ModalidadeAcaoEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ModalidadeAcaoEtiquetaService} from "@cdk/services/modalidade-acao-etiqueta.service";
import * as ModalidadeAcaoEtiquetaActions from "../actions";
import * as AcaoListActions from "../../../acao-list/store/actions";

@Injectable()
export class ModalidadeAcaoEtiquetaEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _modalidadeAcaoEtiquetaService: ModalidadeAcaoEtiquetaService,
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
     * @type {Observable<any>}
     */
    @Effect()
    getModalidadeAcaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaActions.GetModalidadesAcaoEtiqueta>(ModalidadeAcaoEtiquetaActions.GET_MODALIDADES_ACAO_ETIQUETA),
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
                        JSON.stringify({isAdmin: true})
                    ).pipe(
                        mergeMap((response) => [
                            new AddData<ModalidadeAcaoEtiqueta>(
                                {data: response['entities'], schema: modalidadeAcaoEtiquetaSchema}
                                ),
                            new ModalidadeAcaoEtiquetaActions.GetModalidadesAcaoEtiquetaSuccess({
                                entitiesId: response['entities'].map(modalidade => modalidade.id),
                                loaded: {
                                    id: 'etiquetaHandle',
                                    value: this.routerState.params.etiquetaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            return of(new ModalidadeAcaoEtiquetaActions.GetModalidadesAcaoEtiquetaFailed(err));
                        })
                    );
                })
            );
}
