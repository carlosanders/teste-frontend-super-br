import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as CoordenadorActions from '../actions/coordenador.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from '@cdk/normalizr/modalidade-orgao-central.schema';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';

@Injectable()
export class CoordenadorEffect {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _setorService
     * @param _modalidadeOrgaoCentralService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService,
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
     * Get Setor with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSetor: any =
        this._actions
            .pipe(
                ofType<CoordenadorActions.GetSetor>(CoordenadorActions.GET_SETOR),
                switchMap((action) => {
                    return this._setorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                    new CoordenadorActions.GetSetorSuccess({
                        loaded: {
                            id: 'generoHandle_entidadeHandle',
                            value: this.routerState.params.generoHandle + '_' + this.routerState.params.entidadeHandle
                        },
                        setorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CoordenadorActions.GetSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Get OrgaoCentral with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getOrgaoCentral: any =
        this._actions
            .pipe(
                ofType<CoordenadorActions.GetOrgaoCentral>(CoordenadorActions.GET_ORGAO_CENTRAL),
                switchMap((action) => {
                    return this._modalidadeOrgaoCentralService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<ModalidadeOrgaoCentral>({data: response['entities'], schema: modalidadeOrgaoCentralSchema}),
                    new CoordenadorActions.GetOrgaoCentralSuccess({
                        loaded: {
                            id: 'generoHandle_entidadeHandle',
                            value: this.routerState.params.generoHandle + '_' + this.routerState.params.entidadeHandle
                        },
                        orgaoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CoordenadorActions.GetOrgaoCentralFailed(err));
                    return caught;
                })
            );
}
