import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentoAvulsoEditActions from '../actions/documento-avulso-edit.actions';
import * as DocumentoAvulsoListActions
    from '../../../documento-avulso-list/store/actions/documento-avulso-list.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DocumentoAvulsoEditEffect {
    routerState: any;
    /**
     * Get DocumentoAvulso with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentoAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoEditActions.GetDocumentoAvulso>(DocumentoAvulsoEditActions.GET_DOCUMENTO_AVULSO),
        switchMap(action => this._documentoAvulsoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'processo',
                'especieDocumentoAvulso',
                'modelo',
                'setorDestino',
                'pessoaDestino',
                'documentoRemessa',
                'documentoResposta',
                'documentoResposta.componentesDigitais',
            ]))),
        switchMap(response => [
            new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
            new DocumentoAvulsoEditActions.GetDocumentoAvulsoSuccess({
                loaded: {
                    id: 'documentoAvulsoHandle',
                    value: this.routerState.params.documentoAvulsoHandle
                },
                documentoAvulsoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoEditActions.GetDocumentoAvulsoFailed(err));
        })
    ));
    /**
     * Save DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    saveDocumentoAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoEditActions.SaveDocumentoAvulso>(DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO),
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
                new DocumentoAvulsoEditActions.SaveDocumentoAvulsoSuccess(),
                new DocumentoAvulsoListActions.ReloadDocumentosAvulsos(),
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
                return of(new DocumentoAvulsoEditActions.SaveDocumentoAvulsoFailed(err));
            })
        ))
    ));
    /**
     * Save DocumentoAvulso Success
     */
    saveDocumentoAvulsoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoEditActions.SaveDocumentoAvulsoSuccess>(DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO_SUCCESS),
        tap(() => {
            this._router.navigate([
                this.routerState.url.replace(('editar/' + this.routerState.params.documentoAvulsoHandle), 'listar')
            ]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
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
