import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import * as DocumentoCopiaCreateBlocoActions from '../actions/documento-copia-create-bloco.actions';

import {DocumentoService} from '@cdk/services/documento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class DocumentoCopiaCreateBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save DocumentoCopia
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoCopia: any =
        this._actions
            .pipe(
                ofType<DocumentoCopiaCreateBlocoActions.SaveDocumentoCopia>(DocumentoCopiaCreateBlocoActions.SAVE_DOCUMENTO_COPIA),
                mergeMap((action) => {
                    return this._documentoService.save(action.payload.documento).pipe(
                        mergeMap((response: Documento) => [
                            new DocumentoCopiaCreateBlocoActions.SaveDocumentoCopiaSuccess({juntadaId: action.payload.juntadaId, documento: action.payload.documento}),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documentoCopia',
                                content: `Cópia da juntada id ${action.payload.juntadaId} criada com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'documentoCopia',
                                content: `Houve erro na cópia na juntada id ${action.payload.juntadaId}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new DocumentoCopiaCreateBlocoActions.SaveDocumentoCopiaFailed({
                                juntadaId: action.payload.juntadaId,
                                errors: err,
                                documento: action.payload.documento
                            }));
                        })
                    );
                })
            );

}
