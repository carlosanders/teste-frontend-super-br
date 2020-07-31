import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ArquivistaActions from '../actions/arquivista.actions';

import {Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';

@Injectable()
export class ArquivistaEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Get Processos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<ArquivistaActions.GetProcessos>(ArquivistaActions.GET_PROCESSOS),
                switchMap((action) => {
                    return this._processoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));

                }),
                mergeMap((response) => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ArquivistaActions.GetProcessosSuccess({
                        entitiesId: response['entities'].map(processo => processo.id),
                        loaded: {
                            id: 'unidadeHandle_typeHandle',
                            value: this.routerState.params.unidadeHandle + '_' +
                                this.routerState.params.typeHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ArquivistaActions.GetProcessosFailed(err));
                    return caught;
                })
            );


    /**
     * Update Processo
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentProcesso: Observable<ArquivistaActions.ArquivistaActionsAll> =
        this._actions
            .pipe(
                ofType<ArquivistaActions.SetCurrentProcesso>(ArquivistaActions.SET_CURRENT_PROCESSO),
                map((action) => {
                        this._router.navigate([
                            'apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
                            this.routerState.params.typeHandle + '/detalhe/processo/' +
                           action.payload.processoId + '/visualizar']
                        ).then();

                        return new ArquivistaActions.SetCurrentProcessoSuccess();
                })
            );




}
