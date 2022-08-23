import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {concatMap, Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProcessoSolicitarDossiesActions from '../actions/processo-solicitar-dossies.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {AddData} from '@cdk/ngrx-normalizr';
import {Interessado, Dossie} from '@cdk/models';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {tipoDossie as tipoDossieSchema} from '@cdk/normalizr';
import {InteressadoService} from '@cdk/services/interessado.service';
import {DossieService} from '@cdk/services/dossie.service';
import {TipoDossieService} from '@cdk/services/tipo-dossie.service';
import * as OperacoesActions from "../../../../../../store/actions/operacoes.actions";

@Injectable()
export class ProcessoSolicitarDossiesEffect {
    routerState: any;

    /**
     * Get Interessados with router parameters
     *
     * @type {Observable<any>}
     */
    getInteressados: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoSolicitarDossiesActions.GetInteressadosDossies>(ProcessoSolicitarDossiesActions.GET_INTERESSADOS_DOSSIES),
        switchMap(action => this._interessadoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
            new ProcessoSolicitarDossiesActions.GetInteressadosDossiesSuccess({
                entitiesId: response['entities'].map(interessado => interessado.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            }),
            new ProcessoSolicitarDossiesActions.GetTiposDossies({
                    filter: {
                    },
                    gridFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {id: 'DESC'},
                    populate: [
                        'populateAll'
                    ]
                }
            )
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoSolicitarDossiesActions.GetInteressadosDossiesFailed(err));
        })
    ));

    /**
     * Get Tipos de Dossie with router parameters
     *
     * @type {Observable<any>}
     */
    getTiposDossie: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoSolicitarDossiesActions.GetTiposDossies>(ProcessoSolicitarDossiesActions.GET_TIPOS_DOSSIES),
        switchMap(action => this._tiposDossiesService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Dossie>({data: response['entities'], schema: tipoDossieSchema}),
            new ProcessoSolicitarDossiesActions.GetTiposDossiesSuccess({
                entitiesDossieId: response['entities'].map(tipoDossie => tipoDossie.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoSolicitarDossiesActions.GetInteressadosDossiesFailed(err));
        })
    ));

    /**
     * Save Dossie
     *
     * @type {Observable<any>}
     */
    saveDossie: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoSolicitarDossiesActions.SaveDossies>(ProcessoSolicitarDossiesActions.SAVE_DOSSIES),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'dossie',
            content: 'Salvando o dossie ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        concatMap(action => this._dossiesService.save(action.payload.dossie).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'dossie',
                content: 'Dossiê: ' + response?.tipoDossie?.nome + ' para: ' + response?.pessoa?.nome +
                    ' solicitado com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Dossie) => [
                new ProcessoSolicitarDossiesActions.SaveDossiesSuccess(response)
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'dossie',
                    content: 'Erro ao salvar o dossiê!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new ProcessoSolicitarDossiesActions.SaveDossiesFailed(err));
            })
        ))
    ));


    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _interessadoService: InteressadoService,
        private _dossiesService: DossieService,
        private _tiposDossiesService: TipoDossieService,
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
