import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeAll, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as FolderListActions from '../actions';
import {FolderService} from '@cdk/services/folder.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Folder} from '@cdk/models';
import {folder as folderSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import * as fromStore from '../index';
import {GetFolders} from '../actions';
import {log} from 'util';

@Injectable()
export class FolderListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        public _loginService: LoginService,
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
     * Get Folders with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getFolders: any =
        this._actions
            .pipe(
                ofType<FolderListActions.GetFolders>(FolderListActions.GET_FOLDERS),
                switchMap(action => this._folderService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap(response => [
                            new AddData<Folder>({data: response['entities'], schema: folderSchema}),
                            new FolderListActions.GetFoldersSuccess({
                                entitiesId: response['entities'].map(folder => folder.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FolderListActions.GetFoldersFailed(err));
                        })
                    ))
            );

    @Effect()
    deleteFolder: Observable<FolderListActions.FolderListActionsAll> =
        this._actions
            .pipe(
                ofType<FolderListActions.DeleteFolder>(FolderListActions.DELETE_FOLDER),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'folder',
                        content: 'Apagando a folder id ' + action.payload.folderId + '...',
                        status: 0, // carregando
                        redo: action.payload.redo,
                        undo: action.payload.undo
                    }));
                }),
                // buffer(this._store.pipe(select(getBufferingDelete))),
                // mergeAll(),
                // withLatestFrom(this._store.pipe(select(getDeletingFolderIds))),
                mergeMap((action) => {
                    // if (deletingFoldersIds.indexOf(action.payload.folderId) === -1) {
                    //     this._store.dispatch(new OperacoesActions.Operacao({
                    //         id: action.payload.operacaoId,
                    //         type: 'folder',
                    //         content: 'Operação de apagar a folder id ' + action.payload.folderId + ' foi cancelada!',
                    //         status: 3, // cancelada
                    //         lote: action.payload.loteId,
                    //         redo: 'inherent',
                    //         undo: 'inherent'
                    //     }));
                    //     return of(new FolderListActions.DeleteFolderCancelSuccess(action.payload.folderId));
                    // }
                    return this._folderService.destroy(action.payload.folderId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'folder',
                                content: 'Folder id ' + action.payload.folderId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                redo: 'inherent',
                                undo: 'inherent'
                            }));
                            new UpdateData<Folder>({
                                id: response.id,
                                schema: folderSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new FolderListActions.DeleteFolderSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.folderId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'folder',
                                content: 'Erro ao apagar a folder id ' + action.payload.folderId + '!',
                                status: 2, // erro
                                redo: 'inherent',
                                undo: 'inherent'
                            }));
                            console.log(err);
                            return of(new FolderListActions.DeleteFolderFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Undelete Folder
     *
     * @type {Observable<any>}
     */
    @Effect()
    undeleteFolder: Observable<FolderListActions.FolderListActionsAll> =
        this._actions
            .pipe(
                ofType<FolderListActions.DeleteFolder>(FolderListActions.UNDELETE_FOLDER),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'folder',
                        content: 'Restaurando a folder id ' + action.payload.folder.id + '...',
                        status: 0, // carregando
                    }));
                }),
                mergeMap((action) => {
                    const folder = action.payload.folder ? action.payload.folder.id : null;
                    const context: any = {};
                    if (folder) {
                        context.folderId = folder;
                    }
                    return this._folderService.undelete(action.payload.folder, '[]', JSON.stringify(context)).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'folder',
                                content: 'Folder id ' + action.payload.folder.id + ' restaurada com sucesso.',
                                status: 1, // sucesso
                            }));
                            return new FolderListActions.UndeleteFolderSuccess({
                                folder: response,
                                loaded: action.payload.loaded
                            });
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.folder.id,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'folder',
                                content: 'Erro ao restaurar a folder id ' + action.payload.folder.id + '!',
                                status: 2, // erro
                            }));
                            console.log(err);
                            return of(new FolderListActions.UndeleteFolderFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Undelete Folder Success
     */
    @Effect({dispatch: false})
    undeleteFolderSuccess: any =
        this._actions
            .pipe(
                ofType<FolderListActions.UndeleteFolderSuccess>(FolderListActions.UNDELETE_FOLDER_SUCCESS),
                tap((action) => {
                    return of(new FolderListActions.GetFolders({}));
                })
            );
}
