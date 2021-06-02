import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, exhaustMap, mergeMap, withLatestFrom, switchMap, tap } from 'rxjs/operators';

import { getRouterState, State } from 'app/store/reducers';
import * as RelatorioViewActions from 'app/main/apps/relatorios/relatorio-detail/relatorio-view/store/actions/relatorio-view.actions';

import { AddData } from '@cdk/ngrx-normalizr';
import { Relatorio } from '@cdk/models/relatorio.model';
import { relatorio as relatorioSchema } from '@cdk/normalizr';
import { RelatorioService } from '@cdk/services/relatorio.service';
import { getCurrentStep, getIndex, getPagination } from '../selectors';
import { ComponenteDigitalService } from '@cdk/services/componente-digital.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class RelatorioViewEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>
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
     * Get Relatorios with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getRelatorios: Observable<any> =
        this._actions
            .pipe(
                ofType<RelatorioViewActions.GetRelatorios>(RelatorioViewActions.GET_RELATORIOS),
                switchMap(action => this._relatorioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))),
                mergeMap(response => [
                    new AddData<Relatorio>({ data: response['entities'], schema: relatorioSchema }),
                    new RelatorioViewActions.GetRelatoriosSuccess({
                        index: response['entities'].map(
                            (relatorio) => {
                                let componentesDigitaisIds = [];
                                if (relatorio.documento.componentesDigitais && relatorio.documento.componentesDigitais !== null) {
                                    componentesDigitaisIds = relatorio.documento.componentesDigitais.map(
                                        cd => cd.id
                                    );
                                }
                                if (relatorio.documento.vinculacoesDocumentos && relatorio.documento.vinculacoesDocumentos !== null) {
                                    relatorio.documento.vinculacoesDocumentos.map(
                                        (vinculacaoDocumento) => {
                                            vinculacaoDocumento.documentoVinculado.componentesDigitais.map(
                                                cd => componentesDigitaisIds.push(cd.id)
                                            );
                                        }
                                    );
                                }
                                return componentesDigitaisIds;
                            }
                        ),
                        entitiesId: response['entities'].map(relatorio => relatorio.id),
                        loaded: {
                            id: 'relatorioHandle',
                            value: this.routerState.params.relatorioHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RelatorioViewActions.GetRelatoriosFailed(err));
                    return caught;
                })
            );

    /**
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentStep: Observable<RelatorioViewActions.RelatorioViewActionsAll> =
        this._actions
            .pipe(
                ofType<RelatorioViewActions.SetCurrentStep>(RelatorioViewActions.SET_CURRENT_STEP),
                withLatestFrom(this._store.pipe(select(getIndex)), this._store.pipe(select(getCurrentStep))),
                switchMap(([action, index, currentStep]) => {
                    if (typeof index[currentStep.step] === 'undefined' || typeof index[currentStep.step][currentStep.subStep] === 'undefined') {
                        return throwError(new Error('não há documentos'));
                    }
                    const chaveAcesso = this.routerState.params.chaveAcessoHandle ?
                        { chaveAcesso: this.routerState.params.chaveAcessoHandle } : {};
                    const context = JSON.stringify(chaveAcesso);

                    return this._componenteDigitalService.download(index[currentStep.step][currentStep.subStep], context);
                }),
                map((response: any) => new RelatorioViewActions.SetCurrentStepSuccess(response)),
                catchError((err, caught) => {
                    this._store.dispatch(new RelatorioViewActions.SetCurrentStepFailed(err));
                    return caught;
                })
            );

    /**
     * Set Current Step
     */
    @Effect({ dispatch: false })
    getRelatoriosSuccess: any =
        this._actions
            .pipe(
                ofType<RelatorioViewActions.GetRelatoriosSuccess>(RelatorioViewActions.GET_RELATORIOS_SUCCESS),
                withLatestFrom(this._store.pipe(select(getPagination))),
                tap(([action, pagination]) => {
                    if (pagination.offset === 0) {
                        this._store.dispatch(new RelatorioViewActions.SetCurrentStep({ step: 0, subStep: 0 }));
                    }
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new RelatorioViewActions.SetCurrentStepFailed(err));
                    return caught;
                })
            );
}
