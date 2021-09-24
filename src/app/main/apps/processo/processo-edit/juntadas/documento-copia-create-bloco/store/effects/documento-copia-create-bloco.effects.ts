import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as DocumentoCopiaCreateBlocoActions from '../actions/documento-copia-create-bloco.actions';

import {DocumentoService} from '@cdk/services/documento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DocumentoCopiaCreateBlocoEffect {
    routerState: any;
    /**
     * Save DocumentoCopia
     *
     * @type {Observable<any>}
     */
    saveDocumentoCopia: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoCopiaCreateBlocoActions.SaveDocumentoCopia>(DocumentoCopiaCreateBlocoActions.SAVE_DOCUMENTO_COPIA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'cópia da juntada',
            content: 'Salvando a cópia da juntada ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._documentoService.save(action.payload.documento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'cópia da juntada',
                content: 'Cópia da juntada id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Documento) => [
                new DocumentoCopiaCreateBlocoActions.SaveDocumentoCopiaSuccess({
                    juntadaId: action.payload.juntadaId,
                    documento: action.payload.documento
                }),
                new AddData<Documento>({data: [response], schema: documentoSchema})
            ]),
            catchError((err) => {
                const payload = {
                    juntadaId: action.payload.juntadaId,
                    errors: err
                }
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'cópia da juntada',
                    content: 'Erro ao salvar a cópia da juntada!',
                    status: 2, // erro
                }));
                return of(new DocumentoCopiaCreateBlocoActions.SaveDocumentoCopiaFailed(payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
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
