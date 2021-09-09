import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentoAvulsoCreateBlocoActions from '../actions/documento-avulso-create-bloco.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
        }))),
        switchMap(action => this._documentoAvulsoService.save(action.payload.documentoAvulso).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento avulso',
                content: 'Documento avulso id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: DocumentoAvulso) => [
                new DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulsoSuccess(response),
                new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Erro ao salvar o documento avulso!',
                    status: 2, // erro
                }));
                return of(new DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulsoFailed(err));
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
