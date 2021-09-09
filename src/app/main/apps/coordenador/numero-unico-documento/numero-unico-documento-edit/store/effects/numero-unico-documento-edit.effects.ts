import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as NumeroUnicoDocumentoEditActions from '../actions/numero-unico-documento-edit.actions';
import * as NumeroUnicoDocumentoListActions from '../../../numero-unico-documento-list/store/actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema} from '@cdk/normalizr';
import {NumeroUnicoDocumento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class NumeroUnicoDocumentoEditEffect {
    routerState: any;
    /**
     * Get NumeroUnicoDocumento with router parameters
     *
     * @type {Observable<any>}
     */
    getNumeroUnicoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NumeroUnicoDocumentoEditActions.GetNumeroUnicoDocumento>(NumeroUnicoDocumentoEditActions.GET_NUMERO_UNICO_DOCUMENTO),
        switchMap(action => this._numeroUnicoDocumentoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'setor.unidade',
                'tipoDocumento.especieDocumento'
            ]),
            JSON.stringify(action.payload.context))),
        switchMap(response => [
            new AddData<NumeroUnicoDocumento>({data: response['entities'], schema: numeroUnicoDocumentoSchema}),
            new NumeroUnicoDocumentoEditActions.GetNumeroUnicoDocumentoSuccess({
                loaded: {
                    id: 'numeroUnicoDocumentoHandle',
                    value: this.routerState.params.numeroUnicoDocumentoHandle
                },
                numeroUnicoDocumentoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new NumeroUnicoDocumentoEditActions.GetNumeroUnicoDocumentoFailed(err));
        })
    ));
    /**
     * Save NumeroUnicoDocumento
     *
     * @type {Observable<any>}
     */
    saveNumeroUnicoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumento>(NumeroUnicoDocumentoEditActions.SAVE_NUMERO_UNICO_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'número único do documento',
            content: 'Salvando o número único do documento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._numeroUnicoDocumentoService.save(action.payload.numeroUnicoDocumento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'número único do documento',
                content: 'Número único do documento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: NumeroUnicoDocumento) => [
                new NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumentoSuccess(),
                new NumeroUnicoDocumentoListActions.ReloadNumerosUnicosDocumentos(),
                new AddData<NumeroUnicoDocumento>({data: [response], schema: numeroUnicoDocumentoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'número único do documento',
                    content: 'Erro ao salvar o número único do documento!',
                    status: 2, // erro
                }));
                return of(new NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumentoFailed(err));
            })
        ))
    ));
    /**
     * Save NumeroUnicoDocumento Success
     */
    saveNumeroUnicoDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumentoSuccess>(NumeroUnicoDocumentoEditActions.SAVE_NUMERO_UNICO_DOCUMENTO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.numeroUnicoDocumentoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _numeroUnicoDocumentoService: NumeroUnicoDocumentoService,
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
