import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as EnviaEmailActions from '../actions/envia-email.actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class EnviaEmailEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
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
     * Envia email Juntada
     *
     * @type {Observable<any>}
     */
    @Effect()
    enviaEmailJuntada: any =
        this._actions
            .pipe(
                ofType<EnviaEmailActions.EnviaEmail>(EnviaEmailActions.ENVIA_EMAIL_DOCUMENTO),
                switchMap((action) => {
                    const context = JSON.stringify({usuario: action.payload.usuarioId});
                    return this._juntadaService.enviaEmail(action.payload.juntadaId, context).pipe(
                        mergeMap((response: Juntada) => [
                            new EnviaEmailActions.EnviaEmailSuccess(response),
                            new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'juntada',
                                content: `Juntada id ${response.id} enviada por email com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new EnviaEmailActions.EnviaEmailFailed(err));
                        })
                    );
                })
            );


    /**
     * Envia Email Juntada Success
     */
    @Effect({ dispatch: false })
    enviaEmailJuntadaSuccess: any =
        this._actions
            .pipe(
                ofType<EnviaEmailActions.EnviaEmailSuccess>(EnviaEmailActions.ENVIA_EMAIL_DOCUMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([
                        'apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                        this.routerState.params.typeHandle + '/' +
                        this.routerState.params.targetHandle + '/tarefa/' + this.routerState.params.tarefaHandle +
                        '/processo/' + this.routerState.params.processoHandle + '/visualizar']
                    ).then();
                })
            );

    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getJuntada: any =
        this._actions
            .pipe(
                ofType<EnviaEmailActions.GetJuntada>(EnviaEmailActions.GET_JUNTADA),
                switchMap(() => {
                    let handle = {
                        id: '',
                        value: ''
                    };
                    const routeParams = of('juntadaHandle');
                    routeParams.subscribe((param) => {
                        if (this.routerState.params[param]) {
                            handle = {
                                id: param,
                                value: this.routerState.params[param]
                            };
                        }
                    });

                    return this._juntadaService.query(
                        `{"id": "eq:${handle.value}"}`,
                        1);
                }),
                switchMap(response => [
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new EnviaEmailActions.GetJuntadaSuccess({
                        loaded: {
                            id: 'juntadaHandle',
                            value: this.routerState.params.juntadaHandle
                        }
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EnviaEmailActions.GetJuntadaFailed(err));
                    return caught;
                })
            );
}
