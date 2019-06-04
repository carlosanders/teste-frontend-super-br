import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of, throwError} from 'rxjs';
import {catchError, map, exhaustMap, mergeMap, withLatestFrom, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models/juntada.model';
import {juntada as juntadaSchema} from '@cdk/normalizr/juntada.schema';
import {JuntadaService} from '@cdk/services/juntada.service';
import {getCurrentStep, getIndex} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class ProcessoViewEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _componenteDigitalService: ComponenteDigitalService,
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
     * Get Juntadas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getJuntadas: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoViewActions.GetJuntadas>(ProcessoViewActions.GET_JUNTADAS),
                exhaustMap((action) => {
                    return this._juntadaService.query(
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
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new ProcessoViewActions.GetJuntadasSuccess({
                        index: response['entities'].map(
                            juntada => {
                                const componentesDigitaisIds = juntada.documento.componentesDigitais.map(
                                    cd => cd.id
                                );
                                juntada.documento.vinculacoesDocumentos.map(
                                    vinculacaoDocumento => {
                                        vinculacaoDocumento.documentoVinculado.componentesDigitais.map(
                                            cd => componentesDigitaisIds.push(cd.id)
                                        );
                                    }
                                );
                                return componentesDigitaisIds;
                            }
                        ),
                        entitiesId: response['entities'].map(juntada => juntada.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ProcessoViewActions.GetJuntadasFailed(err));
                    return caught;
                })
            );

    /**
     * Set Current Step
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentStep: Observable<ProcessoViewActions.ProcessoViewActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessoViewActions.SetCurrentStep>(ProcessoViewActions.SET_CURRENT_STEP),
                withLatestFrom(this._store.pipe(select(getIndex)), this._store.pipe(select(getCurrentStep))),
                switchMap(([action, index, currentStep]) => {
                    if (typeof index[currentStep.step] === 'undefined' || typeof index[currentStep.step][currentStep.subStep] === 'undefined') {
                        return throwError(new Error('não há documentos'));
                    }
                    return this._componenteDigitalService.download(index[currentStep.step][currentStep.subStep]);
                }),
                map((response: any) => {
                    return new ProcessoViewActions.SetCurrentStepSuccess(response);
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new ProcessoViewActions.SetCurrentStepFailed(err));
                    return caught;
                })
            );
}
