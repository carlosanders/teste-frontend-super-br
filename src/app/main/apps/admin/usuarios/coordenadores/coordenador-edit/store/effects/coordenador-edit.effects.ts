import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as CoordenadorEditActions from '../actions/coordenador-edit.actions';
import * as CoordenadoresListActions from '../../../coordenadores-list/store/actions';

import {CoordenadorService} from '@cdk/services/coordenador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {coordenador as coordenadorSchema} from '@cdk/normalizr/coordenador.schema';
import {Coordenador} from '@cdk/models/coordenador.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class CoordenadorEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _coordenadorService: CoordenadorService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get Coordenador with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getCoordenador: any =
        this._actions
            .pipe(
                ofType<CoordenadorEditActions.GetCoordenador>(CoordenadorEditActions.GET_COORDENADOR),
                switchMap((action) => {
                    return this._coordenadorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'colaborador.usuario',
                        ]));
                }),
                switchMap(response => [
                    new AddData<Coordenador>({data: response['entities'], schema: coordenadorSchema}),
                    new CoordenadorEditActions.GetCoordenadorSuccess({
                        loaded: {
                            id: 'coordenadorHandle',
                            value: this.routerState.params.coordenadorHandle
                        },
                        coordenadorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CoordenadorEditActions.GetCoordenadorFailed(err));
                    return caught;
                })
            );

    /**
     * Save Coordenador
     * @type {Observable<any>}
     */
    @Effect()
    saveCoordenador: any =
        this._actions
            .pipe(
                ofType<CoordenadorEditActions.SaveCoordenador>(CoordenadorEditActions.SAVE_COORDENADOR),
                switchMap((action) => {
                    return this._coordenadorService.save(action.payload).pipe(
                        mergeMap((response: Coordenador) => [
                            new CoordenadorEditActions.SaveCoordenadorSuccess(),
                            new CoordenadoresListActions.ReloadCoordenadores(),
                            new AddData<Coordenador>({data: [response], schema: coordenadorSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CoordenadorEditActions.SaveCoordenadorFailed(err));
                    return caught;
                })
            );

    /**
     * Save Coordenador Success
     */
    @Effect({dispatch: false})
    saveCoordenadorSuccess: any =
        this._actions
            .pipe(
                ofType<CoordenadorEditActions.SaveCoordenadorSuccess>(CoordenadorEditActions.SAVE_COORDENADOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.coordenadorHandle), 'listar')]).then();
                })
            );
}