import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentosAvulsoActions from '../actions/oficios.actions';

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getPagination} from "../selectors";

@Injectable()
export class OficiosEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _documentoAvulsoService
     * @param _loginService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        public _loginService: LoginService,
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
                            id: 'oficioTargetHandle_pessoaHandle',
                            value: this.routerState.params.oficioTargetHandle + '_' + this.routerState.params.pessoaHandle
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
     * Reload DocumentosAvulso
     */
    @Effect({dispatch: false})
    reloadDocumentosAvulso: Observable<any> =
        this._actions
            .pipe(
                ofType<DocumentosAvulsoActions.ReloadDocumentosAvulso>(DocumentosAvulsoActions.RELOAD_DOCUMENTOS_AVULSO),
                withLatestFrom(this._store.pipe(select(getPagination))),
                tap(([action, pagination]) => {
                    return this._store.dispatch(new DocumentosAvulsoActions.GetDocumentosAvulso(pagination));
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
                            'apps/oficios/' + this.routerState.params.oficioTargetHandle + '/' + this.routerState.params.pessoaHandle
                            + '/detalhe/' + action.payload.documentoAvulsoId + '/processo/' + action.payload.processoId + '/acesso-negado']
                        ).then();
                    } else {
                        this._router.navigate([
                            'apps/oficios/' + this.routerState.params.oficioTargetHandle + '/' + this.routerState.params.pessoaHandle
                            + '/detalhe/' + action.payload.documentoAvulsoId + '/processo/' + action.payload.processoId
                            + '/chave/' + action.payload.chaveAcesso + '/visualizar']
                        ).then();
                    }

                    return new DocumentosAvulsoActions.SetCurrentDocumantoAvulsoSuccess();
                })
            );

    /**
     * Toggle Lida Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    toggleLidaTarefa: any =
        this._actions
            .pipe(
                ofType<DocumentosAvulsoActions.ToggleLidaDocumentosAvulso>(DocumentosAvulsoActions.TOGGLE_LIDA_DOCUMENTOS_AVULSO),
                mergeMap((action) => {
                    return this._documentoAvulsoService.toggleLida(action.payload).pipe(
                        mergeMap((response) => [
                            new DocumentosAvulsoActions.ToggleLidaDocumentosAvulsoSuccess(response.id),
                            new UpdateData<DocumentoAvulso>({
                                id: response.id,
                                schema: documentoAvulsoSchema,
                                changes: {dataHoraLeitura: response.dataHoraLeitura}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentosAvulsoActions.ToggleLidaDocumentosAvulsoFailed(action.payload));
                        })
                    );
                })
            );
}
