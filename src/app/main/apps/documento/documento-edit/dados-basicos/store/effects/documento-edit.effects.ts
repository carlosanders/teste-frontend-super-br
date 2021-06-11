import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

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
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoEditActions.SaveDocumento>(DocumentoEditActions.SAVE_DOCUMENTO),
                switchMap(action => this._documentoService.save(action.payload).pipe(
                        mergeMap((response: Documento) => [
                            new DocumentoEditActions.SaveDocumentoSuccess(),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documento',
                                content: `Documento id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoEditActions.SaveDocumentoFailed(err));
                        })
                    ))
            );
}
