import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentoIdentificadorEditActions from '../actions/documento-identificador-edit.actions';
import * as DocumentoIdentificadorListActions
    from '../../../documento-identificador-list/store/actions/documento-identificador-list.actions';

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
    /**
     * Get DocumentoIdentificador with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentoIdentificador: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoIdentificadorEditActions.GetDocumentoIdentificador>(DocumentoIdentificadorEditActions.GET_DOCUMENTO_IDENTIFICADOR),
        switchMap(action => this._documentoIdentificadorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentoIdentificadorEditActions.GetDocumentoIdentificadorFailed(err));
        })
    ));
    /**
     * Save DocumentoIdentificador
     *
     * @type {Observable<any>}
     */
    saveDocumentoIdentificador: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoIdentificadorEditActions.SaveDocumentoIdentificador>(DocumentoIdentificadorEditActions.SAVE_DOCUMENTO_IDENTIFICADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento identificador',
            content: 'Salvando o documento identificador ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._documentoIdentificadorService.save(action.payload.documentoIdentificador).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento identificador',
                content: 'Documento identificador id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: DocumentoIdentificador) => [
                new DocumentoIdentificadorEditActions.SaveDocumentoIdentificadoruccess(),
                new DocumentoIdentificadorListActions.ReloadDocumentoIdentificador(),
                new AddData<DocumentoIdentificador>({data: [response], schema: documentoIdentificadorchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento identificador',
                    content: 'Erro ao salvar o documento identificador!',
                    status: 2, // erro
                }));
                return of(new DocumentoIdentificadorEditActions.SaveDocumentoIdentificadorFailed(err));
            })
        ))
    ));
    /**
     * Save DocumentoIdentificador Success
     */
    saveDocumentoIdentificadoruccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoIdentificadorEditActions.SaveDocumentoIdentificadoruccess>(DocumentoIdentificadorEditActions.SAVE_DOCUMENTO_IDENTIFICADOR_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('documentos/editar/' + this.routerState.params.documentoIdentificadorHandle), 'documentos/listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoIdentificadorService: DocumentoIdentificadorService,
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
