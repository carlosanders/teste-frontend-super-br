import { AddData, UpdateData } from '@cdk/ngrx-normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import { catchError, map, concatMap, mergeMap, switchMap, tap } from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessosActions from '../actions/protocolos-externos.actions';

import {Processo, Assunto} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {assunto as assuntoSchema} from '@cdk/normalizr/assunto.schema';
import {ProcessoService} from '@cdk/services/processo.service';
import {AssuntoService} from '@cdk/services/assunto.service';

@Injectable()
export class ProcessosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _assuntoService: AssuntoService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Get Processos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetProcessos>(ProcessosActions.GET_PROCESSOS),
                switchMap((action) => {
                    return this._processoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ProcessosActions.GetProcessosSuccess({
                        entitiesId: response['entities'].map(processo => processo.id),
                        loaded: {
                            id: 'pessoaHandle_usuarioHandle',
                            value: this.routerState.params.pessoaHandle + '_' + this._loginService.getUserProfile().id
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * Update Processo
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentProcesso: Observable<ProcessosActions.ProcessosActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessosActions.SetCurrentProcesso>(ProcessosActions.SET_CURRENT_PROCESSO),
                map((action) => {
                    /*if (action.payload.acessoNegado) {
                        this._router.navigate([
                            'apps/protocolo-externo/detalhe/' + action.payload.processoId + '/processo/' + action.payload.processoId + '/acesso-negado'
                            ]).then();
                    } else {*/
                        this._router.navigate([
                            'apps/protocolo-externo/' + this.routerState.params.pessoaHandle +
                            '/detalhe/' + action.payload.processoId + '/processo/' + action.payload.processoId + '/visualizar']
                        ).then();
                    /*}*/

                    return new ProcessosActions.SetCurrentProcessoSuccess();
                })
            );

    /**
     * Update Processo
     * @type {Observable<any>}
     */
    @Effect()
    createProcesso: Observable<ProcessosActions.ProcessosActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessosActions.CreateProcesso>(ProcessosActions.CREATE_PROCESSO),
                map(() => {
                    this._router.navigate(['apps/protocolo-externo/' + this.routerState.params.pessoaHandle +
                    '/criar']).then();
                    return new ProcessosActions.CreateProcessoSuccess();
                })
            );

    /**
     * Delete Processo
     * @type {Observable<any>}
     */
    @Effect()
    deleteProcesso: Observable<ProcessosActions.ProcessosActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessosActions.DeleteProcesso>(ProcessosActions.DELETE_PROCESSO),
                mergeMap((action) => {
                    return this._processoService.destroy(action.payload).pipe(
                        map((response) => new ProcessosActions.DeleteProcessoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessosActions.DeleteProcessoFailed(action.payload));
                        })
                    );
                })
            );

    // /**
    //  * Toggle Lida Processo
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // toggleLidaProcesso: any =
    //     this._actions
    //         .pipe(
    //             ofType<ProcessosActions.ToggleLidaProcesso>(ProcessosActions.TOGGLE_LIDA_PROCESSO),
    //             mergeMap((action) => {
    //                 return this._processoService.toggleLida(action.payload).pipe(
    //                     mergeMap((response) => [
    //                         new ProcessosActions.ToggleLidaProcessoSuccess(response.id),
    //                         new UpdateData<Processo>({id: response.id, schema: processoSchema, changes: {dataHoraLeitura: response.dataHoraLeitura}})
    //                     ]),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new ProcessosActions.ToggleLidaProcessoFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );

    // /**
    //  * Toggle Urgente Processo
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // toggleUrgenteProcesso: any =
    //     this._actions
    //         .pipe(
    //             ofType<ProcessosActions.ToggleUrgenteProcesso>(ProcessosActions.TOGGLE_URGENTE_PROCESSO),
    //             mergeMap((action) => {
    //                 return this._processoService.patch(action.payload, {
    //                     urgente: !action.payload.urgente
    //                 }).pipe(
    //                     mergeMap((response) => [
    //                         new ProcessosActions.ToggleUrgenteProcessoSuccess(response.id),
    //                         new UpdateData<Processo>({id: response.id, schema: processoSchema, changes: {urgente: response.urgente}})
    //                     ]),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new ProcessosActions.ToggleUrgenteProcessoFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );

    /**
     * ISSUE-107
     * Get Assuntos Processo processo from input parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetAssuntosProcesso>(ProcessosActions.GET_ASSUNTOS_PROCESSO),
                switchMap((action) => {
                    return this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))
                }),
                mergeMap((response) => [
                    new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
                    new ProcessosActions.GetAssuntosProcessoSuccess({
                        assuntosId: response['entities'].map(assunto => assunto.id),
                        idProcessoToLoadAssuntos:response['entities'][0].processo.id,
                        totalAssuntos: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetAssuntosProcessoFailed(err));
                    return caught;
                })
            );
}
