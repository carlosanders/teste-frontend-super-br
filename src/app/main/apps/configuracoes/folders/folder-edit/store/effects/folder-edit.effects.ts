import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
import {GetFolders} from '../../../../../tarefas/store';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class FolderEditEffect {
    routerState: any;
    /**
     * Get Folder with router parameters
     *
     * @type {Observable<any>}
     */
    getFolder: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<FolderEditActions.GetFolder>(FolderEditActions.GET_FOLDER),
        switchMap(action => this._folderService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new FolderEditActions.GetFolderFailed(err));
        })
    ));
    /**
     * Save Folder
     *
     * @type {Observable<any>}
     */
    saveFolder: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<FolderEditActions.SaveFolder>(FolderEditActions.SAVE_FOLDER),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'pasta',
            content: 'Salvando a pasta ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._folderService.save(action.payload.folder).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'pasta',
                content: 'Pasta id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Folder) => [
                new FolderEditActions.SaveFolderSuccess(),
                new FolderListActions.ReloadFolders(),
                new GetFolders([]),
                new AddData<Folder>({data: [response], schema: folderSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'pasta',
                    content: 'Erro ao salvar a pasta!',
                    status: 2, // erro
                }));
                return of(new FolderEditActions.SaveFolderFailed(err));
            })
        ))
    ));
    /**
     * Save Folder Success
     */
    saveFolderSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<FolderEditActions.SaveFolderSuccess>(FolderEditActions.SAVE_FOLDER_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.targetHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
