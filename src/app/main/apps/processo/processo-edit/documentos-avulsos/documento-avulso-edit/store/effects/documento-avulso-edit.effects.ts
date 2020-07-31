import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as DocumentoAvulsoEditActions from '../actions/documento-avulso-edit.actions';
import * as DocumentoAvulsoListActions from '../../../documento-avulso-list/store/actions/documento-avulso-list.actions';

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

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
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
     * Get DocumentoAvulso with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoEditActions.GetDocumentoAvulso>(DocumentoAvulsoEditActions.GET_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoEditActions.GetDocumentoAvulsoFailed(err));
                    return caught;
                })
            );

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
                            new DocumentoAvulsoListActions.ReloadDocumentosAvulsos(),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documentoAvulso',
                                content: `Documento Avulso id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new DocumentoAvulsoEditActions.SaveDocumentoAvulsoFailed(err));
                        })
                    );
                })
            );


    /**
     * Save DocumentoAvulso Success
     */
    @Effect({dispatch: false})
    saveDocumentoAvulsoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoEditActions.SaveDocumentoAvulsoSuccess>(DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.documentoAvulsoHandle), 'listar')]).then();
                })
            );
}
