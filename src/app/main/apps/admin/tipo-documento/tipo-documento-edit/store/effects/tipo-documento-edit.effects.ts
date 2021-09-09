import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TipoDocumentoEditActions from '../actions/tipo-documento-edit.actions';
import * as TipoDocumentoListActions from '../../../tipo-documento-list/store/actions/tipo-documento-list.actions';

import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoDocumento as tipoDocumentoSchema} from '@cdk/normalizr';
import {TipoDocumento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TipoDocumentoEditEffects {
    routerState: any;
    /**
     * Get TipoDocumento with router parameters
     *
     * @type {Observable<any>}
     */
    getTipoDocumento: any = createEffect(() => this._actions.pipe(
        ofType<TipoDocumentoEditActions.GetTipoDocumento>(TipoDocumentoEditActions.GET_TIPO_DOCUMENTO),
        switchMap(action => this._tipoDocumentoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<TipoDocumento>({data: response['entities'], schema: tipoDocumentoSchema}),
            new TipoDocumentoEditActions.GetTipoDocumentoSuccess({
                loaded: {
                    id: 'tipoDocumentoHandle',
                    value: this.routerState.params.tipoDocumentoHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TipoDocumentoEditActions.GetTipoDocumentoFailed(err));
        })
    ));
    /**
     * Save TipoDocumento
     *
     * @type {Observable<any>}
     */
    saveTipoDocumento: any = createEffect(() => this._actions.pipe(
        ofType<TipoDocumentoEditActions.SaveTipoDocumento>(TipoDocumentoEditActions.SAVE_TIPO_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tipo de documento',
            content: 'Salvando o tipo de documento ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._tipoDocumentoService.save(action.payload.tipoDocumento, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo de documento',
                    content: 'Tipo de documento id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: TipoDocumento) => [
                    new TipoDocumentoEditActions.SaveTipoDocumentoSuccess(response),
                    new TipoDocumentoListActions.ReloadTipoDocumento(),
                    new AddData<TipoDocumento>({data: [response], schema: tipoDocumentoSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tipoDocumento',
                        content: 'Erro ao salvar o tipo de documento!',
                        status: 2, // erro
                    }));
                    return of(new TipoDocumentoEditActions.SaveTipoDocumentoFailed(err));
                })
            );
        })
    ));
    /**
     * Update TipoDocumento
     *
     * @type {Observable<any>}
     */
    updateTipoDocumento: any = createEffect(() => this._actions.pipe(
        ofType<TipoDocumentoEditActions.UpdateTipoDocumento>(TipoDocumentoEditActions.UPDATE_TIPO_DOCUMENTO),
        switchMap(action => this._tipoDocumentoService.patch(action.payload.tipoDocumento, action.payload.changes).pipe(
            mergeMap((response: TipoDocumento) => [
                new TipoDocumentoListActions.ReloadTipoDocumento(),
                new AddData<TipoDocumento>({data: [response], schema: tipoDocumentoSchema}),
                new TipoDocumentoEditActions.UpdateTipoDocumentoSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new TipoDocumentoEditActions.UpdateTipoDocumentoFailed(err));
        })
    ));
    /**
     * Save TipoDocumento Success
     */
    saveTipoDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TipoDocumentoEditActions.SaveTipoDocumentoSuccess>(TipoDocumentoEditActions.SAVE_TIPO_DOCUMENTO_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/tipos-documentos/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _tipoDocumentoService: TipoDocumentoService,
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
