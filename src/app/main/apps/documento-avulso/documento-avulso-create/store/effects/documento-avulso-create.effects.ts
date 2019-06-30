import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as DocumentoAvulsoCreateActions from '../actions/documento-avulso-create.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Documento} from '@cdk/models/documento.model';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DocumentoAvulsoCreateEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router
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
                ofType<DocumentoAvulsoCreateActions.SaveDocumentoAvulso>(DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.save(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoAvulsoCreateActions.SaveDocumentoAvulsoSuccess(),
                            new DocumentoAvulsoCreateActions.GetDocumento(response.id),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documentoAvulso',
                                content: `Documento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new DocumentoAvulsoCreateActions.SaveDocumentoAvulsoFailed(err));
                        })
                    );
                })
            );

    /**
     * Get Documento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoCreateActions.GetDocumento>(DocumentoAvulsoCreateActions.GET_DOCUMENTO),

                switchMap((action) => {
                    return this._documentoService.query(
                        `{"documentoAvulsoRemessa.id": "eq:${action.payload}"}`,
                        1,
                        0,
                        '{}',
                        '["populateAll"]');
                }),
                switchMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentoAvulsoCreateActions.GetDocumentoSuccess(response['entities'][0].id),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoCreateActions.GetDocumentoFailed(err));
                    return caught;
                })
            );

    @Effect({ dispatch: false })
    getDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoCreateActions.GetDocumentoSuccess>(DocumentoAvulsoCreateActions.GET_DOCUMENTO_SUCCESS),
                tap((action) => {
                    this._router.navigate([
                        this.routerState.url.replace('oficio', '/atividades/criar/documento') + '/' + action.payload + '/oficio']
                    ).then();
                })
            );
}
