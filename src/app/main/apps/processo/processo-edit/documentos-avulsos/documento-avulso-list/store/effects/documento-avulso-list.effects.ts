import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoAvulsoListActions from '../actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';
import {
    TableDefinitionsService
} from "@cdk/components/table-definitions/table-definitions.service";
import {DocumentoAvulsoListComponent} from "../../documento-avulso-list.component";

@Injectable()
export class DocumentoAvulsoListEffect {
    routerState: any;
    /**
     * Get DocumentosAvulsos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosAvulsos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoListActions.GetDocumentosAvulsos>(DocumentoAvulsoListActions.GET_DOCUMENTOS_AVULSOS),
        switchMap(action => this._documentoAvulsoService.query(
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
            new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
            new DocumentoAvulsoListActions.GetDocumentosAvulsosSuccess({
                entitiesId: response['entities'].map(documentoAvulso => documentoAvulso.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            this._tableDefinitionsService.deleteTableDefinitions(
                this._tableDefinitionsService.generateTableDeinitionIdentifier(DocumentoAvulsoListComponent.GRID_DEFINITIONS_KEYS)
            ).subscribe();
            return of(new DocumentoAvulsoListActions.GetDocumentosAvulsosFailed(err));
        })
    ));
    /**
     * Delete DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    deleteDocumentoAvulso: Observable<DocumentoAvulsoListActions.DocumentoAvulsoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoListActions.DeleteDocumentoAvulso>(DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento avulso',
            content: 'Apagando o documento avulso id ' + action.payload.documentoAvulsoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoAvulsoService.destroy(action.payload.documentoAvulsoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Documento avulso id ' + action.payload.documentoAvulsoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<DocumentoAvulso>({
                    id: response.id,
                    schema: documentoAvulsoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new DocumentoAvulsoListActions.DeleteDocumentoAvulsoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoAvulsoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Erro ao apagar o documento avulso id ' + action.payload.documentoAvulsoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentoAvulsoListActions.DeleteDocumentoAvulsoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Responder DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    responderDocumentoAvulso: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoListActions.ResponderDocumentoAvulso>(DocumentoAvulsoListActions.RESPONDER_DOCUMENTO_AVULSO),
        tap(() => {
            this._router.navigate([this.routerState.url.replace('oficios/listar', 'oficios/responder')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _store: Store<State>,
        private _router: Router,
        private _tableDefinitionsService: TableDefinitionsService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
