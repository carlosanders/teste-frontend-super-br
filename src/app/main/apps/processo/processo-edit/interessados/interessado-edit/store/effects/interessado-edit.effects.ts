import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap, withLatestFrom, map} from 'rxjs/operators';

import * as InteressadoEditActions from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store/actions/interessado-edit.actions';
import * as InteressadoListActions from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/actions/interessado-list.actions';

import {InteressadoService} from '@cdk/services/interessado.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema} from '@cdk/normalizr/interessado.schema';
import {Interessado} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class InteressadoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _interessadoService: InteressadoService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Interessado with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getInteressado: any =
        this._actions
            .pipe(
                ofType<InteressadoEditActions.GetInteressado>(InteressadoEditActions.GET_INTERESSADO),
                switchMap((action) => {
                    return this._interessadoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
                    new InteressadoEditActions.GetInteressadoSuccess({
                        loaded: {
                            id: 'interessadoHandle',
                            value: this.routerState.params.interessadoHandle
                        },
                        interessadoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new InteressadoEditActions.GetInteressadoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Interessado
     * @type {Observable<any>}
     */
    @Effect()
    saveInteressado: any =
        this._actions
            .pipe(
                ofType<InteressadoEditActions.SaveInteressado>(InteressadoEditActions.SAVE_INTERESSADO),
                switchMap((action) => {
                    return this._interessadoService.save(action.payload).pipe(
                        mergeMap((response: Interessado) => [
                            new InteressadoEditActions.SaveInteressadoSuccess(),
                            new InteressadoListActions.ReloadInteressados(),
                            new AddData<Interessado>({data: [response], schema: interessadoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'interessado',
                                content: `Interessado id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new InteressadoEditActions.SaveInteressadoFailed(err));
                        })
                    );
                })
            );


    /**
     * Save Interessado Success
     */
    @Effect({dispatch: false})
    saveInteressadoSuccess: any =
        this._actions
            .pipe(
                ofType<InteressadoEditActions.SaveInteressadoSuccess>(InteressadoEditActions.SAVE_INTERESSADO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.interessadoHandle), 'listar')]).then();
                })
            );
}
