import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.GetJuntada>(JuntadaActions.GET_JUNTADA),
        switchMap(action => this._juntadaService.query(
            `{"documento.id": "eq:${action.payload}"}`,
            1,
            0,
            JSON.stringify({}),
            JSON.stringify(['volume']))),
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
        catchError((err) => {
            console.log(err);
            return of(new JuntadaActions.GetJuntadaFailed(err));
        })
    ));
    /**
     * Save Juntada
     *
     * @type {Observable<any>}
     */
    saveJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.SaveJuntada>(JuntadaActions.SAVE_JUNTADA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'juntada',
            content: 'Salvando a juntada ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._juntadaService.save(action.payload.juntada).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'juntada',
                content: 'Juntada id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Juntada) => [
                new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                new UpdateData<Juntada>({
                    id: response.id,
                    schema: juntadaSchema,
                    changes: {descricao: response.descricao}
                }),
                new JuntadaActions.SaveJuntadaSuccess()
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'juntada',
                    content: 'Erro ao salvar a juntada!',
                    status: 2, // erro
                }));
                return of(new JuntadaActions.SaveJuntadaFailed(err));
            })
        ))
    ));
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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
    }
}
