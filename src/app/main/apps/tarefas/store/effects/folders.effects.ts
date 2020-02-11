import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import {catchError, exhaustMap, mergeMap} from 'rxjs/operators';

import * as FoldersActions from 'app/main/apps/tarefas/store/actions/folders.actions';
import { FolderService } from '@cdk/services/folder.service';
import { LoginService } from 'app/main/auth/login/login.service';
import {folder as folderSchema} from '@cdk/normalizr/folder.schema';
import {Folder} from '@cdk/models/folder.model';
import {AddData} from '@cdk/ngrx-normalizr';
import {Store} from '@ngrx/store';
import {FoldersState} from '../reducers';
import {Usuario} from "../../../../../../@cdk/models/usuario.model";

@Injectable()
export class FoldersEffect
{
    private _profile: Usuario;

    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        private _store: Store<FoldersState>,
        private _loginService: LoginService
    ) {
        this._profile = _loginService.getUserProfile();
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
}
