import {AddChildData, AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr/tipo-relatorio.schema';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, concatMap, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TipoRelatoriosActions from '../actions/tipo-relatorio.actions';

import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TipoRelatoriosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoRelatorioService: TipoRelatorioService,
        public _loginService: LoginService,
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
     * Get TipoRelatorios with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTipoRelatorios: Observable<any> =
        this._actions
            .pipe(
                ofType<TipoRelatoriosActions.GetTipoRelatorios>(TipoRelatoriosActions.GET_TIPO_RELATORIO),
                switchMap((action) => {
                    return this._tipoRelatorioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<TipoRelatorio>({data: response['entities'], schema: tipoRelatorioSchema}),
                    new TipoRelatoriosActions.GetTipoRelatoriosSuccess({
                        entitiesId: response['entities'].map(tipoRelatorio => tipoRelatorio.id),
                        loaded: {
                            id: 'generoHandle_typeHandle_targetHandle',
                            value: this.routerState.params.generoHandle + '_' +
                                this.routerState.params.typeHandle + '_' + this.routerState.params.targetHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoRelatoriosActions.GetTipoRelatoriosFailed(err));
                    return caught;
                })
            );

    /**
     * Create Tipo Relatorio
     * @type {Observable<any>}
     */
    @Effect()
    createTipoRelatorio: Observable<TipoRelatoriosActions.TipoRelatoriosActionsAll> =
        this._actions
            .pipe(
                ofType<TipoRelatoriosActions.CreateTipoRelatorio>(TipoRelatoriosActions.CREATE_TIPO_RELATORIO),
                map(() => {
                    this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/'
                    + 'tipo-relatorio/entrada/criar-tipo-relatorio/criar']).then();
                    return new TipoRelatoriosActions.CreateTipoRelatorioSuccess();
                })
            );

    /**
     * Delete TipoRelatorio
     * @type {Observable<any>}
     */
    @Effect()
    deleteTipoRelatorio: Observable<TipoRelatoriosActions.TipoRelatoriosActionsAll> =
        this._actions
            .pipe(
                ofType<TipoRelatoriosActions.DeleteTipoRelatorio>(TipoRelatoriosActions.DELETE_TIPO_RELATORIO),
                mergeMap((action) => {
                    return this._tipoRelatorioService.destroy(action.payload).pipe(
                        map((response) => new TipoRelatoriosActions.DeleteTipoRelatorioSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoRelatoriosActions.DeleteTipoRelatorioFailed(action.payload));
                        })
                    );
                })
            );

}
