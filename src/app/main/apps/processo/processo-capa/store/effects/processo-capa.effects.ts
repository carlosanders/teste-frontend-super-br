import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoCapaActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddChildData, AddData} from '@cdk/ngrx-normalizr';
import {Assunto, Interessado, Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {assunto as assuntoSchema} from '@cdk/normalizr/assunto.schema';
import {interessado as interessadoSchema} from '@cdk/normalizr/interessado.schema';
import {AssuntoService} from '@cdk/services/assunto.service';
import {InteressadoService} from '@cdk/services/interessado.service';

@Injectable()
export class ProcessoCapaEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _assuntoService: AssuntoService,
        private _interessadoService: InteressadoService,
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
     * Get Processo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoCapaActions.GetProcesso>(ProcessoCapaActions.GET_PROCESSO),
                switchMap((action) => {
                    const chaveAcesso = this.routerState.params.chaveAcessoHandle ? {
                        chaveAcesso: this.routerState.params.chaveAcessoHandle
                    } : {};
                    return this._processoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'setorAtual.unidade',
                            'modalidadeMeio',
                            'modalidadeFase',
                            'documentoAvulsoOrigem',
                            'especieProcesso',
                            'classificacao',
                            'classificacao.modalidadeDestinacao',
                            'setorInicial',
                            'setorAtual'
                        ]),
                        JSON.stringify(chaveAcesso));
                }),
                mergeMap(response => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ProcessoCapaActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        processoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoCapaActions.GetProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Get Assuntos Processo
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoCapaActions.GetAssuntosProcesso>(ProcessoCapaActions.GET_ASSUNTOS_PROCESSO),
                switchMap((action) => {
                    return this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.params.filter
                        }),
                        action.payload.params.limit,
                        action.payload.params.offset,
                        JSON.stringify(action.payload.params.sort),
                        JSON.stringify(action.payload.params.populate)).pipe(
                        mergeMap((response) => [
                            new ProcessoCapaActions.GetAssuntosProcessoSuccess(action.payload.processoId),
                            new AddChildData<Assunto>({
                                data: response['entities'],
                                childSchema: assuntoSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processoId
                            }),
                        ]),
                        catchError((err, caught) => {
                            console.log(err);
                            this._store.dispatch(new ProcessoCapaActions.GetAssuntosProcessoFailed(action.payload.processoId));
                            return caught;
                        })
                    );
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
                ofType<ProcessoCapaActions.GetInteressadosProcesso>(ProcessoCapaActions.GET_INTERESSADOS_PROCESSO),
                switchMap((action) => {
                    return this._interessadoService.query(
                        JSON.stringify({
                            ...action.payload.params.filter
                        }),
                        action.payload.params.limit,
                        action.payload.params.offset,
                        JSON.stringify(action.payload.params.sort),
                        JSON.stringify(action.payload.params.populate)).pipe(
                        mergeMap((response) => [
                            new ProcessoCapaActions.GetInteressadosProcessoSuccess(action.payload.processoId),
                            new AddChildData<Interessado>({
                                data: response['entities'],
                                childSchema: interessadoSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processoId
                            }),
                        ]),
                        catchError((err, caught) => {
                            console.log(err);
                            this._store.dispatch(new ProcessoCapaActions.GetInteressadosProcessoFailed(action.payload.processoId));
                            return caught;
                        })
                    );
                })
            );
}
