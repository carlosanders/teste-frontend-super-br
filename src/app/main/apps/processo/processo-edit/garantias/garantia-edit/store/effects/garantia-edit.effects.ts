import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as GarantiaEditActions from '../actions/garantia-edit.actions';
import * as GarantiaListActions from '../../../garantia-list/store/actions/garantia-list.actions';

import {GarantiaService} from '@cdk/services/garantia.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {garantia as garantiaSchema} from '@cdk/normalizr';
import {Garantia} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class GarantiaEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _garantiaService: GarantiaService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Garantia with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getGarantia: any =
        this._actions
            .pipe(
                ofType<GarantiaEditActions.GetGarantia>(GarantiaEditActions.GET_GARANTIA),
                switchMap(action => this._garantiaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Garantia>({data: response['entities'], schema: garantiaSchema}),
                    new GarantiaEditActions.GetGarantiaSuccess({
                        loaded: {
                            id: 'garantiaHandle',
                            value: this.routerState.params.garantiaHandle
                        },
                        garantiaId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new GarantiaEditActions.GetGarantiaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Garantia
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveGarantia: any =
        this._actions
            .pipe(
                ofType<GarantiaEditActions.SaveGarantia>(GarantiaEditActions.SAVE_GARANTIA),
                switchMap(action => this._garantiaService.save(action.payload).pipe(
                        mergeMap((response: Garantia) => [
                            new GarantiaEditActions.SaveGarantiaSuccess(),
                            new GarantiaListActions.ReloadGarantias(),
                            new AddData<Garantia>({data: [response], schema: garantiaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'garantia',
                                content: `Garantia id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new GarantiaEditActions.SaveGarantiaFailed(err));
                        })
                    ))
            );
    /**
     * Save Garantia Success
     */
    @Effect({dispatch: false})
    saveGarantiaSuccess: any =
        this._actions
            .pipe(
                ofType<GarantiaEditActions.SaveGarantiaSuccess>(GarantiaEditActions.SAVE_GARANTIA_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.garantiaHandle), 'listar')]).then();
                })
            );
}
