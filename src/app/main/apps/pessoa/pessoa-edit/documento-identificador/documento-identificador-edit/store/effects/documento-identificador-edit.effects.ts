import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as DocumentoIdentificadorEditActions from '../actions/documento-identificador-edit.actions';
import * as DocumentoIdentificadorListActions from '../../../documento-identificador-list/store/actions/documento-identificador-list.actions';

import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoIdentificador as documentoIdentificadorchema} from '@cdk/normalizr';
import {DocumentoIdentificador} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DocumentoIdentificadorEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoIdentificadorService: DocumentoIdentificadorService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get DocumentoIdentificador with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentoIdentificador: any =
        this._actions
            .pipe(
                ofType<DocumentoIdentificadorEditActions.GetDocumentoIdentificador>(DocumentoIdentificadorEditActions.GET_DOCUMENTO_IDENTIFICADOR),
                switchMap((action) => {
                    return this._documentoIdentificadorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<DocumentoIdentificador>({data: response['entities'], schema: documentoIdentificadorchema}),
                    new DocumentoIdentificadorEditActions.GetDocumentoIdentificadoruccess({
                        loaded: {
                            id: 'documentoIdentificadorHandle',
                            value: this.routerState.params.documentoIdentificadorHandle
                        },
                        documentoIdentificadorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoIdentificadorEditActions.GetDocumentoIdentificadorFailed(err));
                    return caught;
                })
            );

    /**
     * Save DocumentoIdentificador
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoIdentificador: any =
        this._actions
            .pipe(
                ofType<DocumentoIdentificadorEditActions.SaveDocumentoIdentificador>(DocumentoIdentificadorEditActions.SAVE_DOCUMENTO_IDENTIFICADOR),
                switchMap((action) => {
                    return this._documentoIdentificadorService.save(action.payload).pipe(
                        mergeMap((response: DocumentoIdentificador) => [
                            new DocumentoIdentificadorEditActions.SaveDocumentoIdentificadoruccess(),
                            new DocumentoIdentificadorListActions.ReloadDocumentoIdentificador(),
                            new AddData<DocumentoIdentificador>({data: [response], schema: documentoIdentificadorchema}),
                            new OperacoesActions.Resultado({
                                type: 'documentoIdentificador',
                                content: `Documento Identificador id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new DocumentoIdentificadorEditActions.SaveDocumentoIdentificadorFailed(err));
                        })
                    );
                })
            );


    /**
     * Save DocumentoIdentificador Success
     */
    @Effect({dispatch: false})
    saveDocumentoIdentificadoruccess: any =
        this._actions
            .pipe(
                ofType<DocumentoIdentificadorEditActions.SaveDocumentoIdentificadoruccess>(DocumentoIdentificadorEditActions.SAVE_DOCUMENTO_IDENTIFICADOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('documentos/editar/' + this.routerState.params.documentoIdentificadorHandle), 'documentos/listar')]).then();
                })
            );
}
