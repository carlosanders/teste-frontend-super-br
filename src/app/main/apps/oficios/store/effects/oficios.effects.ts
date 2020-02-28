import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentosAvulsoActions from '../actions/oficios.actions';

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';

@Injectable()
export class OficiosEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Tarefas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentosAvulso: Observable<any> =
        this._actions
            .pipe(
                ofType<DocumentosAvulsoActions.GetDocumentosAvulso>(DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
                    new DocumentosAvulsoActions.GetDocumentosAvulsoSuccess({
                        entitiesId: response['entities'].map(documentoAvulso => documentoAvulso.id),
                        processoId: response['entities'].map(documentoAvulso => documentoAvulso.processo.id),
                        loaded: {
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentosAvulsoActions.GetDocumentosAvulsoFailed(err));
                    return caught;
                })
            );

    /**
     * Update DocumentoAvulso
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentDocumentoAvulso: Observable<DocumentosAvulsoActions.DocumentosAvulsoActionsAll> =
        this._actions
            .pipe(
                ofType<DocumentosAvulsoActions.SetCurrentDocumentoAvulso>(DocumentosAvulsoActions.SET_CURRENT_DOCUMENTOS_AVULSO),
                map((action) => {
                    if (action.payload.acessoNegado) {
                        this._router.navigate([
                            'apps/oficios/detalhe/' + action.payload.documentoAvulsoId + '/processo/' + action.payload.processoId + '/acesso-negado']
                        ).then();
                    } else {
                        this._router.navigate([
                            'apps/oficios/detalhe/' + action.payload.documentoAvulsoId + '/processo/' + action.payload.processoId
                            + '/visualizar']
                        ).then();
                    }

                    return new DocumentosAvulsoActions.SetCurrentDocumantoAvulsoSuccess();
                })
            );
}
