import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as SigiloActions from '../actions/sigilos.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Sigilo} from '@cdk/models';
import {sigilo as sigiloSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {SigiloService} from '@cdk/services/sigilo.service';

@Injectable()
export class SigilosEffects {
    routerState: any;

    /**
     * Get Sigilo with router parameters
     *
     * @type {Observable<any>}
     */
    getSigilo: any = createEffect(() => this._actions.pipe(
        ofType<SigiloActions.GetSigilo>(SigiloActions.GET_SIGILO_DOCUMENTO),
        switchMap(action => this._sigiloService.query(JSON.stringify({
                id: 'eq:' + action.payload.sigiloId
            }),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new SigiloActions.GetSigiloFailed(err));
        })
    ));

    /**
     * Get Sigilos with router parameters
     *
     * @type {Observable<any>}
     */
    getSigilos: any = createEffect(() => this._actions.pipe(
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
        mergeMap(response => [
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
        catchError((err) => {
            console.log(err);
            return of(new SigiloActions.GetSigilosFailed(err));
        })
    ));

    /**
     * Delete Sigilo
     *
     * @type {Observable<any>}
     */
    deleteSigilo: Observable<SigiloActions.SigiloActionsAll> = createEffect(() => this._actions.pipe(
        ofType<SigiloActions.DeleteSigilo>(SigiloActions.DELETE_SIGILO_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'sigilo',
            content: 'Apagando o sigilo id ' + action.payload.sigiloId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._sigiloService.destroy(action.payload.sigiloId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'sigilo',
                    content: 'Sigilo id ' + action.payload.sigiloId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Sigilo>({
                    id: response.id,
                    schema: sigiloSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new SigiloActions.DeleteSigiloSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.sigiloId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'sigilo',
                    content: 'Erro ao apagar o sigilo id ' + action.payload.sigiloId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new SigiloActions.DeleteSigiloFailed(payload));
            })
        ), 25)
    ));

    /**
     * Save Sigilo
     *
     * @type {Observable<any>}
     */
    saveSigilo: any = createEffect(() => this._actions.pipe(
        ofType<SigiloActions.SaveSigiloDocumento>(SigiloActions.SAVE_SIGILO_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'sigilo',
            content: 'Salvando a sigilo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._sigiloService.save(action.payload.sigilo).pipe(
            tap(response =>
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'sigilo',
                    content: 'Sigilo id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))
            ),
            mergeMap((response: Sigilo) => [
                new SigiloActions.SaveSigiloDocumentoSuccess(),
                new SigiloActions.GetSigilos(action.payload.documentoId),
                new AddData<Sigilo>({data: [response], schema: sigiloSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'sigilo',
                    content: 'Erro ao salvar a sigilo!',
                    status: 2, // erro
                }));
                return of(new SigiloActions.SaveSigiloDocumentoFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _sigiloService: SigiloService,
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
