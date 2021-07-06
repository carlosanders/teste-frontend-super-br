import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as FolderListActions from '../actions';
import {FolderService} from '@cdk/services/folder.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Folder} from '@cdk/models';
import {folder as folderSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

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

    /**
     * Delete Folder
     *
     * @type {Observable<any>}
     */
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
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._folderService.destroy(action.payload.folderId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'folder',
                                content: 'Folder id ' + action.payload.folderId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
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
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new FolderListActions.DeleteFolderFailed(payload));
                        })
                    );
                }, 25)
            );
}
