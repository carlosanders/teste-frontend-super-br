import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, mergeMap, switchMap} from 'rxjs/operators';

import * as FoldersActions from 'app/main/apps/tarefas/store/actions/folders.actions';
import {GetFolders} from 'app/main/apps/tarefas/store/actions/folders.actions';
import {FolderService} from '@cdk/services/folder.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder, Usuario} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {FoldersState} from '../reducers';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';

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
        this._profile = this._loginService.getUserProfile();
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Folders from Server
     *
     * @type {Observable<any>}
     */
    @Effect()
    getFolders: Observable<any> =
        this._actions
            .pipe(
                ofType<FoldersActions.GetFolders>(FoldersActions.GET_FOLDERS),
                exhaustMap(() => this._folderService.query(
                        `{"usuario.id": "eq:${this._profile.id}", "modalidadeFolder.valor": "eq:TAREFA"}`,
                        10,
                        0,
                        '{"nome": "ASC"}')),
                mergeMap(response => [
                    new AddData<Folder>({data: response['entities'], schema: folderSchema}),
                    new FoldersActions.GetFoldersSuccess({
                        entitiesId: response['entities'].map(folder => folder.id),
                        loaded: true,
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    return of(new FoldersActions.GetFoldersFailed(err));
                })
            );

    /**
     * Save Folder
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveFolder: any =
        this._actions
            .pipe(
                ofType<FoldersActions.SaveFolder>(FoldersActions.SAVE_FOLDER),
                switchMap(action => this._folderService.save(action.payload).pipe(
                        mergeMap((response: Folder) => [
                            new FoldersActions.SaveFolderSuccess(),
                            new FoldersActions.ReloadFolders(),
                            new GetFolders([]),
                            new AddData<Folder>({data: [response], schema: folderSchema})
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    return of(new FoldersActions.SaveFolderFailed(err));
                })
            );

    /**
     * Delete Folder
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteFolder: any =
        this._actions
            .pipe(
                ofType<FoldersActions.DeleteFolder>(FoldersActions.DELETE_FOLDER),
                mergeMap(action => this._folderService.destroy(action.payload).pipe(
                        mergeMap (response => [
                            new GetFolders([]),
                            new AddData<Folder>({data: [response], schema: folderSchema}),
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FoldersActions.DeleteFolderFailed(action.payload));
                        })
                    ))
            );
}
