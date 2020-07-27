import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as FoldersActions from 'app/main/apps/tarefas/store/actions/folders.actions';
import {GetFolders} from 'app/main/apps/tarefas/store/actions/folders.actions';
import {FolderService} from '@cdk/services/folder.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {folder as folderSchema} from '@cdk/normalizr/folder.schema';
import {Folder, Usuario} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {FoldersState} from '../reducers';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

@Injectable()
export class FoldersEffect
{
    private _profile: Usuario;
    routerState: any;

    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        private _store: Store<FoldersState>,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this._profile = _loginService.getUserProfile();
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Folders from Server
     * @type {Observable<any>}
     */
    @Effect()

    getFolders: Observable<any> =
        this._actions
            .pipe(
                ofType<FoldersActions.GetFolders>(FoldersActions.GET_FOLDERS),
                exhaustMap(() => {
                    return this._folderService.query(
                        `{"usuario.id": "eq:${this._profile.id}", "modalidadeFolder.valor": "eq:TAREFA"}`,
                        10,
                        0,
                        '{"nome": "ASC"}');
                }),
                mergeMap((response) => [
                    new AddData<Folder>({data: response['entities'], schema: folderSchema}),
                    new FoldersActions.GetFoldersSuccess({
                        entitiesId: response['entities'].map(folder => folder.id),
                        loaded: true,
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FoldersActions.GetFoldersFailed(err));
                    return caught;
                })
            );

    /**
     * Save Folder
     * @type {Observable<any>}
     */
    @Effect()
    saveFolder: any =
        this._actions
            .pipe(
                ofType<FoldersActions.SaveFolder>(FoldersActions.SAVE_FOLDER),
                switchMap((action) => {
                    return this._folderService.save(action.payload).pipe(
                        mergeMap((response: Folder) => [
                            new FoldersActions.SaveFolderSuccess(),
                            new FoldersActions.ReloadFolders(),
                            new GetFolders([]),
                            new AddData<Folder>({data: [response], schema: folderSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FoldersActions.SaveFolderFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Folder
     * @type {Observable<any>}
     */
    @Effect()
    deleteFolder: any =
        this._actions
            .pipe(
                ofType<FoldersActions.DeleteFolder>(FoldersActions.DELETE_FOLDER),
                mergeMap((action) => {
                    return this._folderService.destroy(action.payload).pipe(
                        mergeMap ((response) => [
                            new GetFolders([]),
                            new TarefasActions.GetTarefas([]),
                            new AddData<Folder>({data: [response], schema: folderSchema}),
                            new FoldersActions.DeleteFolderSuccess([response.id]),
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FoldersActions.DeleteFolderFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Folder Success
     */
    @Effect({dispatch: false})
    deleteFolderSuccess: any =
        this._actions
            .pipe(
                ofType<FoldersActions.DeleteFolderSuccess>(FoldersActions.DELETE_FOLDER_SUCCESS),
                tap((action) => {
                    this._router.navigate(['/apps/tarefas/administrativo/minhas-tarefas/entrada']).then();
                })
            );
}
