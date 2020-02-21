import { AddData, UpdateData } from '@cdk/ngrx-normalizr';
import { documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, concatMap, mergeMap, switchMap } from 'rxjs/operators';

import { getRouterState, State } from 'app/store/reducers';
import * as DocumentosAvulsoActions from '../actions/documento-avulso.actions';

import { DocumentoAvulso } from '@cdk/models/documento-avulso.model';
import { DocumentoAvulsoService } from '@cdk/services/documento-avulso.service';
import { LoginService } from 'app/main/auth/login/login.service';
import { Router } from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DocumentosAvulsoEffects {
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
                        /*loaded: {
                            id: 'generoHandle_folderHandle',
                            value: this.routerState.params.generoHandle + '_' + this.routerState.params.folderHandle
                        },*/
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
                    /*if (action.payload.acessoNegado) {
                        this._router.navigate([
                            'apps/oficios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.folderHandle
                            + '/tarefa/' + action.payload.tarefaId + '/processo/' + action.payload.processoId + '/acesso-negado']
                        ).then();
                    } else {
                        this._router.navigate([
                            'apps/oficios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.folderHandle
                            + '/tarefa/' + action.payload.tarefaId + '/processo/' + action.payload.processoId + '/visualizar']
                        ).then();
                    }*/

                    return new DocumentosAvulsoActions.SetCurrentDocumantoAvulsoSuccess();
                })
            );
    //
    // /**
    //  * Update Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // createTarefa: Observable<TarefasActions.TarefasActionsAll> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.CreateTarefa>(TarefasActions.CREATE_TAREFA),
    //             map(() => {
    //                 this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.folderHandle + '/criar']).then();
    //                 return new TarefasActions.CreateTarefaSuccess();
    //             })
    //         );
    //
    // /**
    //  * Delete Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // deleteTarefa: Observable<TarefasActions.TarefasActionsAll> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
    //             mergeMap((action) => {
    //                 return this._tarefaService.destroy(action.payload).pipe(
    //                     map((response) => new TarefasActions.DeleteTarefaSuccess(response.id)),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.DeleteTarefaFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );
    //
    // /**
    //  * Toggle Lida Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // toggleLidaTarefa: any =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.ToggleLidaTarefa>(TarefasActions.TOGGLE_LIDA_TAREFA),
    //             mergeMap((action) => {
    //                 return this._tarefaService.toggleLida(action.payload).pipe(
    //                     mergeMap((response) => [
    //                         new TarefasActions.ToggleLidaTarefaSuccess(response.id),
    //                         new UpdateData<Tarefa>({id: response.id, schema: tarefaSchema, changes: {dataHoraLeitura: response.dataHoraLeitura}})
    //                     ]),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.ToggleLidaTarefaFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );
    //
    // /**
    //  * Toggle Urgente Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // toggleUrgenteTarefa: any =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.ToggleUrgenteTarefa>(TarefasActions.TOGGLE_URGENTE_TAREFA),
    //             mergeMap((action) => {
    //                 return this._tarefaService.patch(action.payload, {
    //                     urgente: !action.payload.urgente
    //                 }).pipe(
    //                     mergeMap((response) => [
    //                         new TarefasActions.ToggleUrgenteTarefaSuccess(response.id),
    //                         new UpdateData<Tarefa>({id: response.id, schema: tarefaSchema, changes: {urgente: response.urgente}})
    //                     ]),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.ToggleUrgenteTarefaFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );
    //
    // /**
    //  * Set Folder on Selected Tarefas
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // setFolderOnSelectedTarefas: Observable<any> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.SetFolderOnSelectedTarefas>(TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS),
    //             concatMap((action) => {
    //                 return this._tarefaService.patch(action.payload.tarefa, {folder: action.payload.folder.id}).pipe(
    //                     mergeMap((response: any) => [
    //                         new TarefasActions.SetFolderOnSelectedTarefasSuccess(response),
    //                         new OperacoesActions.Resultado({
    //                             type: 'tarefa',
    //                             content: `Tarefa id ${response.id} editada com sucesso!`,
    //                             dateTime: response.criadoEm
    //                         })
    //                     ]),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.SetFolderOnSelectedTarefasFailed(err));
    //                     })
    //                 );
    //             })
    //         );
}
