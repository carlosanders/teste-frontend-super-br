import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoAvulsoEditActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {DocumentoAvulso} from '@cdk/models';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as DocumentoActions from '../../../../store/actions/documento.actions';

@Injectable()
export class DocumentoAvulsoEditEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _documentoAvulsoService
     * @param _router
     * @param _store
     */
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
     * Save DocumentoAvulso
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoEditActions.SaveDocumentoAvulso>(DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.save(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoAvulsoEditActions.SaveDocumentoAvulsoSuccess(),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
                            new DocumentoActions.GetDocumento(),
                            new OperacoesActions.Resultado({
                                type: 'documentoAvulso',
                                content: `Documento Avulso id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoAvulsoEditActions.SaveDocumentoAvulsoFailed(err));
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
                ofType<DocumentoAvulsoEditActions.RemeterDocumentoAvulso>(DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.remeter(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new UpdateData<DocumentoAvulso>({
                                id: response.id, schema: documentoAvulsoSchema,
                                changes: {
                                    dataHoraRemessa: response.dataHoraRemessa,
                                    usuarioRemessa: response.usuarioRemessa
                                }
                            }),
                            new DocumentoActions.GetDocumento(),
                            new DocumentoAvulsoEditActions.RemeterDocumentoAvulsoSuccess()
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoEditActions.RemeterDocumentoAvulsoFailed(err));
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
                ofType<DocumentoAvulsoEditActions.ToggleEncerramentoDocumentoAvulso>(DocumentoAvulsoEditActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.toggleEncerramento(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoAvulsoEditActions.ToggleEncerramentoDocumentoAvulsoSuccess(),
                            new UpdateData<DocumentoAvulso>({
                                id: response.id,
                                schema: documentoAvulsoSchema,
                                changes: {dataHoraEncerramento: response.dataHoraEncerramento}
                            })
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoEditActions.ToggleEncerramentoDocumentoAvulsoFailed(err));
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
                ofType<DocumentoAvulsoEditActions.RemeterDocumentoAvulsoSuccess>(DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO_SUCCESS),
                tap(() => {
                    this._router.navigate([
                            this.routerState.url.split('/documento/')[0]
                        ]
                    ).then();
                })
            );
}
