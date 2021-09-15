import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';
import * as ConfiguracaoNupActions from '../actions/configuracao-nup.actions';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {configuracaoNup as configuracaoNupSchema} from '@cdk/normalizr';
import {ConfiguracaoNupService} from '@cdk/services/configuracao-nup.service';
import {ConfiguracaoNup} from '@cdk/models/configuracao-nup.model';

@Injectable()
export class ConfiguracaoNupEffects {
    routerState: any;
    /**
     * Get Interessados Configuracao Nup
     *
     * @type {Observable<any>}
     */
    getConfiguracaoNup: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ConfiguracaoNupActions.GetConfiguracoesNup>(ConfiguracaoNupActions.GET_CONFIGURACOES_NUP),
        switchMap(action => this._configuracaoNupService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<ConfiguracaoNup>({data: response['entities'], schema: configuracaoNupSchema}),
            new ConfiguracaoNupActions.GetConfiguracoesNupSuccess({
                entitiesId: response['entities'].map(configuracaoNup => configuracaoNup.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ConfiguracaoNupActions.GetConfiguracoesNupFailed(err));
        })
    ));

    /**
     *
     * @param _actions
     * @param _configuracaoNupService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _configuracaoNupService: ConfiguracaoNupService,
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
