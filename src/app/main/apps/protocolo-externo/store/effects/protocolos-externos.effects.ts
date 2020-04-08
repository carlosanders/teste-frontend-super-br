import { AddData } from '@cdk/ngrx-normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessosActions from '../actions/protocolos-externos.actions';

import {Processo, Assunto, Pessoa, Interessado} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {assunto as assuntoSchema} from '@cdk/normalizr/assunto.schema';
import {pessoa as pessoaSchema} from '@cdk/normalizr/pessoa.schema';
import {interessado as interessadoSchema} from '@cdk/normalizr/interessado.schema';
import {ProcessoService} from '@cdk/services/processo.service';
import {AssuntoService} from '@cdk/services/assunto.service';
import {PessoaService} from '@cdk/services/pessoa.service';
import {InteressadoService} from '@cdk/services/interessado.service';

@Injectable()
export class ProcessosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _assuntoService: AssuntoService,
        private _pessoaService: PessoaService,
        private _interessadoService: InteressadoService,
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
                    this._router.navigate([
                        'apps/protocolo-externo/' + this.routerState.params.pessoaHandle +
                        '/detalhe/' + action.payload.processoId + '/processo/' + action.payload.processoId + '/visualizar']
                    ).then();

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
     * Get Assuntos Processo
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetAssuntosProcesso>(ProcessosActions.GET_ASSUNTOS_PROCESSO),
                switchMap((action) => {
                    return this._assuntoService.query(
                        JSON.stringify(action.payload),
                        10,
                        0,
                        JSON.stringify({'principal' : 'DESC', 'criadoEm' : 'DESC'}),
                        JSON.stringify(['assuntoAdministrativo', 'processo'])
                    );
                }),
                mergeMap((response) => [
                    new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
                    new ProcessosActions.GetAssuntosProcessoSuccess({
                        assuntosId: response['entities'].map(assunto => assunto.id),
                        idProcessoToLoadAssuntos: response['entities'][0].processo.id,
                        totalAssuntos: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetAssuntosProcessoFailed(err));
                    return caught;
                })
            );


    /**
     * Get Pessoa Conveniada
     * @type {Observable<any>}
     */
    @Effect()
    getPessoa: any =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetPessoa>(ProcessosActions.GET_PESSOA),
                switchMap((action) => {
                    return this._pessoaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)
                    );
                }),
                mergeMap((response) => [
                    new AddData<Pessoa>({data: response['entities'], schema: pessoaSchema}),
                    new ProcessosActions.GetPessoaSuccess({
                        loaded: {
                            id: 'pessoaHandle',
                            value: this.routerState.params.pessoaHandle
                        },
                        pessoa: response['entities'][0]
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * GetInteressados Processo
     * @type {Observable<any>}
     */
    @Effect()
    getInteressadosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetInteressadosProcesso>(ProcessosActions.GET_INTERESSADOS_PROCESSO),
                switchMap((action) => {
                    return this._interessadoService.query(
                    JSON.stringify(action.payload),
                        10,
                        0,
                        JSON.stringify({principal : 'DESC', criadoEm : 'DESC'}),
                        JSON.stringify(['processo', 'modalidadeInteressado', 'pessoa'])
                    );
                }),
                mergeMap((response) => [
                    new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
                    new ProcessosActions.GetInteressadosProcessoSuccess({
                        interessadosId: response['entities'].map(interessado => interessado.id),
                        idProcessoToLoadInteressados: response['entities'][0].processo.id,
                        totalInteressados: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetInteressadosProcessoFailed(err));
                    return caught;
                })
            );
}
