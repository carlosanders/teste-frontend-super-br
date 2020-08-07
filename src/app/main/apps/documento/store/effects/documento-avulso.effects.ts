import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoAvulsoActions from '../actions/documento-avulso.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {DocumentoAvulso} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as DocumentoActions from '../actions/documento.actions';

@Injectable()
export class DocumentoAvulsoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _router: Router,
        private _store: Store<State>
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
     * Save Documento Avulso
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoActions.SaveDocumentoAvulso>(DocumentoAvulsoActions.SAVE_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.save(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoAvulsoActions.SaveDocumentoAvulsoSuccess(),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documento',
                                content: `Documento id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoAvulsoActions.SaveDocumentoAvulsoFailed(err));
                        })
                    );
                })
            );

    /**
     * Remeter Documento Avulso
     * @type {Observable<any>}
     */
    @Effect()
    remeterDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoActions.RemeterDocumentoAvulso>(DocumentoAvulsoActions.REMETER_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.remeter(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new UpdateData<DocumentoAvulso>({id: response.id, schema: documentoAvulsoSchema,
                                changes: {dataHoraRemessa: response.dataHoraRemessa, usuarioRemessa: response.usuarioRemessa}}),
                            new DocumentoActions.GetDocumento(),
                            new DocumentoAvulsoActions.RemeterDocumentoAvulsoSuccess()
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoActions.RemeterDocumentoAvulsoFailed(err));
                    return caught;
                })
            );

    /**
     * Remeter Documento Avulso
     * @type {Observable<any>}
     */
    @Effect()
    toggleEncerramentoDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoActions.ToggleEncerramentoDocumentoAvulso>(DocumentoAvulsoActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.toggleEncerramento(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoAvulsoActions.ToggleEncerramentoDocumentoAvulsoSuccess(),
                            new UpdateData<DocumentoAvulso>({id: response.id, schema: documentoAvulsoSchema, changes: {dataHoraEncerramento: response.dataHoraEncerramento}})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoActions.ToggleEncerramentoDocumentoAvulsoFailed(err));
                    return caught;
                })
            );

    /**
     * Remeter Documento Avulso Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    remeterDocumentoAvulsoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoActions.RemeterDocumentoAvulsoSuccess>(DocumentoAvulsoActions.REMETER_DOCUMENTO_AVULSO_SUCCESS),
                tap(() => {
                    this._router.navigate([
                            this.routerState.url.split('/documento/')[0]
                        ]
                    ).then();
                })
            );
}
