import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as DocumentoAvulsoCreateBlocoActions from '../actions/documento-avulso-create-bloco.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class DocumentoAvulsoCreateBlocoEffect {
    routerState: any;
    /**
     * Save DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    saveDocumentoAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulso>(DocumentoAvulsoCreateBlocoActions.SAVE_DOCUMENTO_AVULSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento avulso',
            content: 'Salvando o documento avulso ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoAvulsoService.save(action.payload.documentoAvulso).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento avulso',
                content: 'Documento avulso id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: DocumentoAvulso) => [
                new DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulsoSuccess({
                    documentoAvulso: action.payload,
                    tarefaId: action.payload.tarefaId
                }),
                new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema})
            ]),
            catchError((err) => {
                const payload = {
                    processoId: action.payload.documentoAvulso.processo.id,
                    tarefaId: action.payload.tarefaId,
                    errors: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Erro ao salvar o documento avulso: ' + CdkUtils.errorsToString(err),
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulsoFailed(payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
