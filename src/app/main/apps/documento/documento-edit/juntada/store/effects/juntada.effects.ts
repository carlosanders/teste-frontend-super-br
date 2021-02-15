import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as JuntadaActions from '../actions/juntada.actions';

import {LoginService} from 'app/main/auth/login/login.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {JuntadaService} from '@cdk/services/juntada.service';

@Injectable()
export class JuntadaEffects {
    routerState: any;
    private _profile: any;

    /**
     *
     * @param _actions
     * @param _juntadaService
     * @param _loginService
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Get Documento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getJuntada: any =
        this._actions
            .pipe(
                ofType<JuntadaActions.GetJuntada>(JuntadaActions.GET_JUNTADA),
                switchMap((action) => {
                    return this._juntadaService.query(
                        `{"documento.id": "eq:${action.payload}"}`,
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify(['volume']));
                }),
                switchMap(response => [
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new JuntadaActions.GetJuntadaSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        juntadaId: response['entities'][0]?.id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new JuntadaActions.GetJuntadaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Juntada
     * @type {Observable<any>}
     */
    @Effect()
    saveJuntada: any =
        this._actions
            .pipe(
                ofType<JuntadaActions.SaveJuntada>(JuntadaActions.SAVE_JUNTADA),
                switchMap((action) => {
                    return this._juntadaService.save(action.payload).pipe(
                        mergeMap((response: Juntada) => [
                            new JuntadaActions.SaveJuntadaSuccess(),
                            new UpdateData<Juntada>({id: response.id, schema: juntadaSchema, changes: {descricao: response.descricao}}),
                            new OperacoesActions.Resultado({
                                type: 'juntada',
                                content: `Juntada id ${response.id} editada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new JuntadaActions.SaveJuntadaFailed(err));
                        })
                    );
                })
            );

}
