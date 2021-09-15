import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as UnidadesOrgaoCentralActions from '../actions/unidades.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema, setor as setorSchema} from '@cdk/normalizr';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';

@Injectable()
export class UnidadesOrgaoCentralEffects {
    routerState: any;
    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    getSetor: any = createEffect(() => this._actions.pipe(
        ofType<UnidadesOrgaoCentralActions.GetSetor>(UnidadesOrgaoCentralActions.GET_SETOR),
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
            new UnidadesOrgaoCentralActions.GetSetorSuccess({
                loaded: {
                    id: 'unidadeHandle',
                    value: this.routerState.params.unidadeHandle
                },
                unidadeId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new UnidadesOrgaoCentralActions.GetSetorFailed(err));
        })
    ));
    /**
     * Get OrgaoCentral with router parameters
     *
     * @type {Observable<any>}
     */
    getOrgaoCentral: any = createEffect(() => this._actions.pipe(
        ofType<UnidadesOrgaoCentralActions.GetOrgaoCentral>(UnidadesOrgaoCentralActions.GET_ORGAO_CENTRAL),
        switchMap(action => this._modalidadeOrgaoCentralService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<ModalidadeOrgaoCentral>({
                data: response['entities'],
                schema: modalidadeOrgaoCentralSchema
            }),
            new UnidadesOrgaoCentralActions.GetOrgaoCentralSuccess({
                loaded: {
                    id: 'entidadeHandle',
                    value: this.routerState.params.entidadeHandle
                },
                orgaoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new UnidadesOrgaoCentralActions.GetOrgaoCentralFailed(err));
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
