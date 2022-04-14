import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EnviaEmailActions from '../actions/envia-email.actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EnviaEmailEffects {
    routerState: any;
    /**
     * Envia email Juntada
     *
     * @type {Observable<any>}
     */
    enviaEmailJuntada: any = createEffect(() => this._actions.pipe(
        ofType<EnviaEmailActions.EnviaEmail>(EnviaEmailActions.ENVIA_EMAIL_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'juntada',
            content: 'Enviando juntada id ' + action.payload.juntadaId + ' por email ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({usuario: action.payload.usuarioId});
            return this._juntadaService.enviaEmail(action.payload.juntadaId, context).pipe(
                tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'juntada',
                    content: 'Juntada id ' + action.payload.juntadaId + ' enviada por email com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Juntada) => [
                    new EnviaEmailActions.EnviaEmailSuccess(response),
                    new AddData<Juntada>({data: [response], schema: juntadaSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'juntada',
                        content: 'Ocorreu um erro no envio da juntada por email.',
                        status: 2, // erro
                    }));
                    return of(new EnviaEmailActions.EnviaEmailFailed(err));
                })
            );
        })
    ));
    /**
     * Envia Email Juntada Success
     */
    enviaEmailJuntadaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<EnviaEmailActions.EnviaEmailSuccess>(EnviaEmailActions.ENVIA_EMAIL_DOCUMENTO_SUCCESS),
        tap(() => {
            if(this.routerState.params.tarefaHandle){
                this._router.navigate([
                    'apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' +
                    this.routerState.params.targetHandle + '/tarefa/' + this.routerState.params.tarefaHandle +
                    '/processo/' + this.routerState.params.processoHandle + '/visualizar']
                    ).then();
            } else {
                this._router.navigate([
                    'apps/processo/' + this.routerState.params.processoHandle + '/visualizar'
                ])
            }
        })
    ), {dispatch: false});
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntada: any = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new EnviaEmailActions.GetJuntadaFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
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
