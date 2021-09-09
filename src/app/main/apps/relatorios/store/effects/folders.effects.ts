import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, mergeMap} from 'rxjs/operators';

import * as FoldersActions from 'app/main/apps/relatorios/store/actions/folders.actions';
import {FolderService} from '@cdk/services/folder.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder, Usuario} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {Store} from '@ngrx/store';
import {FoldersState} from '../reducers';

@Injectable()
export class FoldersEffect {
    /**
     * Get Folders from Server
     *
     * @type {Observable<any>}
     */
    getFolders: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<FoldersActions.GetFolders>(FoldersActions.GET_FOLDERS),
        exhaustMap(() => this._folderService.query(
            `{"usuario.id": "eq:${this._profile.id}", "modalidadeFolder.valor": "eq:RELATORIO"}`,
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
        catchError((err) => {
            console.log(err);
            return of(new FoldersActions.GetFoldersFailed(err));
        })
    ));
    private _profile: Usuario;
    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        private _store: Store<FoldersState>,
        public _loginService: LoginService
    ) {
        this._profile = _loginService.getUserProfile();
    }
}
