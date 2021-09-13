import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoEditActions from '../actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DocumentoEditEffects {
    routerState: any;
    /**
     * Save Documento
     *
     * @type {Observable<any>}
     */
    saveDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoEditActions.SaveDocumento>(DocumentoEditActions.SAVE_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Salvando o documento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._documentoService.save(action.payload.documento, '{}', action.payload.populate).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento',
                content: 'Documento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Documento) => [
                new DocumentoEditActions.SaveDocumentoSuccess(),
                new AddData<Documento>({data: [response], schema: documentoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Erro ao salvar o documento!',
                    status: 2, // erro
                }));
                return of(new DocumentoEditActions.SaveDocumentoFailed(err));
            })
        ))
    ));

    /**
     *
     * @param _actions
     * @param _documentoService
     * @param _router
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
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
