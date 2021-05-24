import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoEditActions from '../actions';

import {ActivatedRoute, Router} from '@angular/router';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {UnloadDocumento} from '../../../../store/actions';
import * as DocumentoSelectors from '../../../../store/selectors/documento.selectors';

@Injectable()
export class DocumentoEditEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _documentoService
     * @param _router
     * @param _store
     * @param _activatedRoute
     */
    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute
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
     * Undelete Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    undeleteDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoEditActions.UndeleteDocumento>(DocumentoEditActions.UNDELETE_DOCUMENTO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Restaurando a documento id ' + action.payload.documento.id + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap(action => this._documentoService.undelete(action.payload.documento).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento',
                                content: 'Documento id ' + action.payload.documento.id + ' restaurado com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            return new DocumentoEditActions.UndeleteDocumentoSuccess(response);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.documento.id,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento',
                                content: 'Erro ao restaurar a documento id ' + action.payload.documento.id + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new DocumentoEditActions.UndeleteDocumentoFailed(payload));
                        })
                    ), 25)
            );

    /**
     * Undelete Documento Success
     */
    @Effect({ dispatch: false })
    undeleteDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoEditActions.UndeleteDocumentoSuccess>(DocumentoEditActions.UNDELETE_DOCUMENTO_SUCCESS),
                withLatestFrom(this._store.pipe(select(DocumentoSelectors.getCurrentComponenteDigital))),
                tap(([action, componenteDigital]) => {
                    let type = '/visualizar';
                    if (componenteDigital.editavel && !componenteDigital.assinado) {
                        type = '/editor/ckeditor';
                    };
                    this._store.dispatch(new UnloadDocumento());
                    let sidebar = 'oficio/dados-basicos';
                    if (!action.payload.documentoAvulsoRemessa) {
                        sidebar = 'editar/atividade';
                    }
                    this._router.navigate([
                            this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                            {
                                outlets: {
                                    primary: 'componente-digital/' + this.routerState.params['componenteDigitalHandle'] + type,
                                    sidebar: sidebar
                                }
                            }
                        ],
                        {
                            relativeTo: this._activatedRoute.parent
                        }).then();
                })
            );

}
