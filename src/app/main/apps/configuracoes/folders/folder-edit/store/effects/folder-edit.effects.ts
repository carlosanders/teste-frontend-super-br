import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as FolderEditActions from '../actions/folder-edit.actions';
import * as FolderListActions from '../../../folder-list/store/actions/folder-list.actions';

import {FolderService} from '@cdk/services/folder.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {GetFolders} from '../../../../../tarefas/store/actions';

@Injectable()
export class FolderEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Folder with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getFolder: any =
        this._actions
            .pipe(
                ofType<FolderEditActions.GetFolder>(FolderEditActions.GET_FOLDER),
                switchMap((action) => {
                    return this._folderService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Folder>({data: response['entities'], schema: folderSchema}),
                    new FolderEditActions.GetFolderSuccess({
                        loaded: {
                            id: 'targetHandle',
                            value: this.routerState.params.targetHandle
                        },
                        folderId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FolderEditActions.GetFolderFailed(err));
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
                ofType<FolderEditActions.SaveFolder>(FolderEditActions.SAVE_FOLDER),
                switchMap((action) => {
                    return this._folderService.save(action.payload).pipe(
                        mergeMap((response: Folder) => [
                            new FolderEditActions.SaveFolderSuccess(),
                            new FolderListActions.ReloadFolders(),
                            new GetFolders([]),
                            new AddData<Folder>({data: [response], schema: folderSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FolderEditActions.SaveFolderFailed(err));
                    return caught;
                })
            );

    /**
     * Save Folder Success
     */
    @Effect({dispatch: false})
    saveFolderSuccess: any =
        this._actions
            .pipe(
                ofType<FolderEditActions.SaveFolderSuccess>(FolderEditActions.SAVE_FOLDER_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.targetHandle), 'listar')]).then();
                })
            );
}
