import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

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

@Injectable()
export class NumeroUnicoDocumentoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _numeroUnicoDocumentoService: NumeroUnicoDocumentoService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get NumeroUnicoDocumento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getNumeroUnicoDocumento: any =
        this._actions
            .pipe(
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new NumeroUnicoDocumentoEditActions.GetNumeroUnicoDocumentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save NumeroUnicoDocumento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveNumeroUnicoDocumento: any =
        this._actions
            .pipe(
                ofType<NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumento>(NumeroUnicoDocumentoEditActions.SAVE_NUMERO_UNICO_DOCUMENTO),
                switchMap(action => this._numeroUnicoDocumentoService.save(action.payload).pipe(
                        mergeMap((response: NumeroUnicoDocumento) => [
                            new NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumentoSuccess(),
                            new NumeroUnicoDocumentoListActions.ReloadNumerosUnicosDocumentos(),
                            new AddData<NumeroUnicoDocumento>({data: [response], schema: numeroUnicoDocumentoSchema})
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save NumeroUnicoDocumento Success
     */
    @Effect({dispatch: false})
    saveNumeroUnicoDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<NumeroUnicoDocumentoEditActions.SaveNumeroUnicoDocumentoSuccess>(NumeroUnicoDocumentoEditActions.SAVE_NUMERO_UNICO_DOCUMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.numeroUnicoDocumentoHandle), 'listar')]).then();
                })
            );
}
