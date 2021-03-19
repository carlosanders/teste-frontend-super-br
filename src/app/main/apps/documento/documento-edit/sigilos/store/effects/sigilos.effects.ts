import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as SigiloActions from '../actions/sigilos.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Sigilo} from '@cdk/models';
import {sigilo as sigiloSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {SigiloService} from '@cdk/services/sigilo.service';

@Injectable()
export class SigilosEffects {

    constructor(
        private _actions: Actions,
        private _sigiloService: SigiloService,
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

    routerState: any;

    /**
     * Get Sigilo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSigilo: any =
        this._actions
            .pipe(
                ofType<SigiloActions.GetSigilo>(SigiloActions.GET_SIGILO_DOCUMENTO),
                switchMap((action) => {
                    return this._sigiloService.query(JSON.stringify({
                            id: 'eq:' + action.payload.sigiloId
                        }),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Sigilo>({data: response['entities'], schema: sigiloSchema}),
                    new SigiloActions.GetSigiloSuccess({
                        loaded: {
                            id: 'sigiloHandle',
                            value: response['entities'][0].id
                        },
                        sigiloId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new SigiloActions.GetSigiloFailed(err));
                    return caught;
                })
            );

    /**
     * Get Sigilos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSigilos: any =
        this._actions
            .pipe(
                ofType<SigiloActions.GetSigilos>(SigiloActions.GET_SIGILOS_DOCUMENTO),
                switchMap((action) => {

                    const params = {
                        filter: action.payload.filter ? action.payload.filter : {
                            'documento.id': 'eq:' + action.payload
                        },
                        limit: action.payload.limit ? action.payload.limit : 5,
                        offset: action.payload.offset ? action.payload.offset : 0,
                        sort: {id: 'DESC'},
                        populate: ['tipoSigilo']
                    };

                    return this._sigiloService.query(
                        JSON.stringify({
                            ...params.filter
                        }),
                        params.limit,
                        params.offset,
                        JSON.stringify(params.sort),
                        JSON.stringify(params.populate));
                }),
                mergeMap((response) => [
                    new AddData<Sigilo>({data: response['entities'], schema: sigiloSchema}),
                    new SigiloActions.GetSigilosSuccess({
                        entitiesId: response['entities'].map(sigilo => sigilo.id),
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new SigiloActions.GetSigilosFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Sigilo
     * @type {Observable<any>}
     */
    @Effect()
    deleteSigilo: any =
        this._actions
            .pipe(
                ofType<SigiloActions.DeleteSigilo>(SigiloActions.DELETE_SIGILO_DOCUMENTO),
                mergeMap((action) => {
                    return this._sigiloService.destroy(action.payload.sigiloId).pipe(
                        map((response) => new SigiloActions.DeleteSigiloSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new SigiloActions.DeleteSigiloFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Sigilo
     * @type {Observable<any>}
     */
    @Effect()
    saveSigilo: any =
        this._actions
            .pipe(
                ofType<SigiloActions.SaveSigiloDocumento>(SigiloActions.SAVE_SIGILO_DOCUMENTO),
                switchMap((action) => {
                    return this._sigiloService.save(action.payload.sigilo).pipe(
                        mergeMap((response: Sigilo) => [
                            new SigiloActions.SaveSigiloDocumentoSuccess(),
                            new SigiloActions.GetSigilos(action.payload.documentoId),
                            new AddData<Sigilo>({data: [response], schema: sigiloSchema}),
                            new OperacoesActions.Resultado({
                                type: 'sigilo',
                                content: `Sigilo id ${response.id} criada com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new SigiloActions.SaveSigiloDocumentoFailed(err));
                        })
                    );
                })
            );

}
