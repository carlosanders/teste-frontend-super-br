import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as CoordenadorActions from '../actions/coordenador.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema, setor as setorSchema} from '@cdk/normalizr';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';

@Injectable()
export class CoordenadorEffect {
    routerState: any;
    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    getSetor: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorActions.GetSetor>(CoordenadorActions.GET_SETOR),
        switchMap(action => this._setorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new CoordenadorActions.GetSetorFailed(err));
        })
    ));
    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    getUnidade: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorActions.GetUnidade>(CoordenadorActions.GET_UNIDADE),
        switchMap(action => this._setorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Setor>({data: response['entities'], schema: setorSchema}),
            new CoordenadorActions.GetUnidadeSuccess({
                loaded: {
                    id: 'generoHandle_entidadeHandle',
                    value: this.routerState.params.generoHandle + '_' + this.routerState.params.entidadeHandle
                },
                unidadeId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new CoordenadorActions.GetUnidadeFailed(err));
        })
    ));
    /**
     * Get OrgaoCentral with router parameters
     *
     * @type {Observable<any>}
     */
    getOrgaoCentral: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorActions.GetOrgaoCentral>(CoordenadorActions.GET_ORGAO_CENTRAL),
        switchMap(action => this._modalidadeOrgaoCentralService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new CoordenadorActions.GetOrgaoCentralFailed(err));
        })
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
