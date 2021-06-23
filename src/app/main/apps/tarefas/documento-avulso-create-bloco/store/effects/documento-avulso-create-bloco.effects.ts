import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import * as DocumentoAvulsoCreateBlocoActions from '../actions/documento-avulso-create-bloco.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class DocumentoAvulsoCreateBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulso>(DocumentoAvulsoCreateBlocoActions.SAVE_DOCUMENTO_AVULSO),
                switchMap(action => this._documentoAvulsoService.save(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulsoSuccess(action.payload),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documento_avulso',
                                content: `Ofício no processo ${action.payload.processo.NUP} criado com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'documento_avulso',
                                content: `Houve erro no ofício no processo ${action.payload.processo.NUP}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new DocumentoAvulsoCreateBlocoActions.SaveDocumentoAvulsoFailed(action.payload));
                        })
                    ))
            );

}
