import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentosAvulsoActions from '../actions/oficios.actions';

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getPagination} from '../selectors';

@Injectable()
export class OficiosEffects {
    routerState: any;
    /**
     * Get Tarefas with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosAvulsoActions.GetDocumentosAvulso>(DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO),
        switchMap(action => this._documentoAvulsoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.folderFilter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        concatMap(response => [
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentosAvulsoActions.GetDocumentosAvulsoFailed(err));
        })
    ));
    /**
     * Reload DocumentosAvulso
     */
    reloadDocumentosAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosAvulsoActions.ReloadDocumentosAvulso>(DocumentosAvulsoActions.RELOAD_DOCUMENTOS_AVULSO),
        withLatestFrom(this._store.pipe(select(getPagination))),
        tap(([action, pagination]) => this._store.dispatch(new DocumentosAvulsoActions.GetDocumentosAvulso(pagination)))
    ), {dispatch: false});
    /**
     * Update DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    setCurrentDocumentoAvulso: Observable<DocumentosAvulsoActions.DocumentosAvulsoActionsAll> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Toggle Lida Tarefa
     *
     * @type {Observable<any>}
     */
    toggleLidaTarefa: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosAvulsoActions.ToggleLidaDocumentosAvulso>(DocumentosAvulsoActions.TOGGLE_LIDA_DOCUMENTOS_AVULSO),
        mergeMap(action => this._documentoAvulsoService.toggleLida(action.payload).pipe(
            mergeMap(response => [
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
        ), 25)
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
