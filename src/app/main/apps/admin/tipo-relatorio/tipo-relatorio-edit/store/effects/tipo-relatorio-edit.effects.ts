import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TipoRelatorioEditActions from '../actions/tipo-relatorio-edit.actions';
import * as TipoRelatorioListActions from '../../../tipo-relatorio-list/store/actions/tipo-relatorio-list.actions';

import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TipoRelatorioEditEffects {
    routerState: any;

    /**
     * Get TipoRelatorio with router parameters
     *
     * @type {Observable<any>}
     */
    getTipoRelatorio: any = createEffect(() => this._actions.pipe(
        ofType<TipoRelatorioEditActions.GetTipoRelatorio>(TipoRelatorioEditActions.GET_TIPO_RELATORIO),
        switchMap(action => this._tipoRelatorioService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<TipoRelatorio>({data: response['entities'], schema: tipoRelatorioSchema}),
            new TipoRelatorioEditActions.GetTipoRelatorioSuccess({
                loaded: {
                    id: 'tipoRelatorioHandle',
                    value: this.routerState.params.tipoRelatorioHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TipoRelatorioEditActions.GetTipoRelatorioFailed(err));
        })
    ));

    /**
     * Save TipoRelatorio
     *
     * @type {Observable<any>}
     */
    saveTipoRelatorio: any = createEffect(() => this._actions.pipe(
        ofType<TipoRelatorioEditActions.SaveTipoRelatorio>(TipoRelatorioEditActions.SAVE_TIPO_RELATORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tipo de relatório',
            content: 'Salvando o tipo de relatório ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._tipoRelatorioService.save(action.payload.tipoRelatorio, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo de relatório',
                    content: 'Tipo de relatório id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: TipoRelatorio) => [
                    new TipoRelatorioEditActions.SaveTipoRelatorioSuccess(response),
                    new TipoRelatorioListActions.ReloadTipoRelatorio(),
                    new AddData<TipoRelatorio>({data: [response], schema: tipoRelatorioSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tipo de relatório',
                        content: 'Erro ao salvar o tipo de relatório!',
                        status: 2, // erro
                    }));
                    return of(new TipoRelatorioEditActions.SaveTipoRelatorioFailed(err));
                })
            );
        })
    ));

    /**
     * Update TipoRelatorio
     *
     * @type {Observable<any>}
     */
    updateTipoRelatorio: any = createEffect(() => this._actions.pipe(
        ofType<TipoRelatorioEditActions.UpdateTipoRelatorio>(TipoRelatorioEditActions.UPDATE_TIPO_RELATORIO),
        switchMap(action => this._tipoRelatorioService.patch(action.payload.tipoRelatorio, action.payload.changes).pipe(
            mergeMap((response: TipoRelatorio) => [
                new TipoRelatorioListActions.ReloadTipoRelatorio(),
                new AddData<TipoRelatorio>({data: [response], schema: tipoRelatorioSchema}),
                new TipoRelatorioEditActions.UpdateTipoRelatorioSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new TipoRelatorioEditActions.UpdateTipoRelatorioFailed(err));
        })
    ));

    /**
     * Save TipoRelatorio Success
     */
    saveTipoRelatorioSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TipoRelatorioEditActions.SaveTipoRelatorioSuccess>(TipoRelatorioEditActions.SAVE_TIPO_RELATORIO_SUCCESS),
        tap((action) => {
            this._router.navigate(['apps/admin/tipos-relatorios/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _tipoRelatorioService: TipoRelatorioService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
