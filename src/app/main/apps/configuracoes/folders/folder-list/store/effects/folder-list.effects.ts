import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as FolderListActions from '../actions';

import {FolderService} from '@cdk/services/folder.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Folder} from '@cdk/models/folder.model';
import {folder as folderSchema} from '@cdk/normalizr/folder.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class FolderListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        private _loginService: LoginService,
        private _store: Store<State>
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
     * Get Folders with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getFolders: any =
        this._actions
            .pipe(
                ofType<FolderListActions.GetFolders>(FolderListActions.GET_FOLDERS),
                switchMap((action) => {
                    return this._folderService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
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
                    );
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
                ofType<FolderListActions.DeleteFolder>(FolderListActions.DELETE_FOLDER),
                mergeMap((action) => {
                    return this._folderService.destroy(action.payload).pipe(
                        map((response) => new FolderListActions.DeleteFolderSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new FolderListActions.DeleteFolderFailed(action.payload));
                        })
                    );
                })
            );
}
