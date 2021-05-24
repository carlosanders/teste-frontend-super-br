import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';


import {AddData} from '@cdk/ngrx-normalizr';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import * as ModalidadeAcaoEtiquetaActions from '../actions';

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
            .subscribe((routerState) => {
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
                ofType<ModalidadeAcaoEtiquetaActions.GetModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaActions.GET_MODALIDADE_ACAO_ETIQUETA),
                switchMap(action => this._modalidadeAcaoEtiquetaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'modalidadeEtiqueta'
                        ]),
                        JSON.stringify({isAdmin: true})
                    )),
                switchMap(response => [
                    new AddData<ModalidadeAcaoEtiqueta>({data: response['entities'], schema: modalidadeAcaoEtiquetaSchema}),
                    new ModalidadeAcaoEtiquetaActions.GetModalidadeAcaoEtiquetaSuccess({
                        loaded: {
                            id:response['entities'][0].id,
                            value: response['entities'][0].trigger
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ModalidadeAcaoEtiquetaActions.GetModalidadeAcaoEtiquetaFailed(err));
                    return caught;
                })
            );
}
