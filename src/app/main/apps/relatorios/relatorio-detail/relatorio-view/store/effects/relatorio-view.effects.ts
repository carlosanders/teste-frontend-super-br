import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of, throwError} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RelatorioViewActions
    from 'app/main/apps/relatorios/relatorio-detail/relatorio-view/store/actions/relatorio-view.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Relatorio} from '@cdk/models/relatorio.model';
import {relatorio as relatorioSchema} from '@cdk/normalizr';
import {RelatorioService} from '@cdk/services/relatorio.service';
import {getCurrentStep, getIndex} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DeselectRelatorioAction} from '../../../store';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {ComponenteDigital} from '../../../../../../../../@cdk/models';

@Injectable()
export class RelatorioViewEffect {
    routerState: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    /**
     * Get Relatorio with router parameters
     *
     * @type {Observable<any>}
     */
    getRelatorio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelatorioViewActions.GetRelatorio>(RelatorioViewActions.GET_RELATORIO),
        switchMap(action => this._relatorioService.get(
            action.payload.id,
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<Relatorio>({data: [response], schema: relatorioSchema}),
            new RelatorioViewActions.GetRelatorioSuccess({
                index: [response].map((relatorio) => {
                    let componentesDigitaisIds = [];
                    if (relatorio.documento?.componentesDigitais) {
                        componentesDigitaisIds = relatorio.documento.componentesDigitais.map(cd => cd.id);
                    }
                    if (relatorio.documento?.vinculacoesDocumentos) {
                        relatorio.documento.vinculacoesDocumentos.map((vinculacaoDocumento) => {
                            vinculacaoDocumento.documentoVinculado.componentesDigitais.map(cd => componentesDigitaisIds.push(cd.id));
                        });
                    }
                    return componentesDigitaisIds;
                }),
                entityId: response?.id,
                loaded: {
                    id: 'relatorioHandle',
                    value: this.routerState.params.relatorioHandle
                }
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RelatorioViewActions.GetRelatorioFailed(err));
        })
    ));
    /**
     * @type {Observable<any>}
     */
    setCurrentStep: Observable<RelatorioViewActions.RelatorioViewActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RelatorioViewActions.SetCurrentStep>(RelatorioViewActions.SET_CURRENT_STEP),
        withLatestFrom(this._store.pipe(select(getIndex)), this._store.pipe(select(getCurrentStep))),
        switchMap(([action, index, currentStep]) => {
            if (typeof index[currentStep.step] === 'undefined' || typeof index[currentStep.step][currentStep.subStep] === 'undefined') {
                return throwError(new Error('Não há documentos'));
            }
            const chaveAcesso = this.routerState.params.chaveAcessoHandle ?
                {chaveAcesso: this.routerState.params.chaveAcessoHandle} : {};
            const context = JSON.stringify(chaveAcesso);

            return this._componenteDigitalService.download(index[currentStep.step][currentStep.subStep], context);
        }),
        map((response: ComponenteDigital) => new RelatorioViewActions.SetCurrentStepSuccess(response)),
        catchError((err) => {
            console.log(err);
            const error = err.message || err.statusText || 'Erro desconhecido!';
            this._matSnackBar.open(error, 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar'],
                duration: 30000
            });
            this._store.dispatch(new DeselectRelatorioAction());
            return of(new RelatorioViewActions.SetCurrentStepFailed(err));
        })
    ));
    /**
     * Get Relatorio Success
     */
    getRelatorioSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RelatorioViewActions.GetRelatorioSuccess>(RelatorioViewActions.GET_RELATORIO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new RelatorioViewActions.SetCurrentStep({step: 0, subStep: 0}));
        }),
        catchError(err => of(new RelatorioViewActions.SetCurrentStepFailed(err)))
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>,
        private _matSnackBar: MatSnackBar
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
