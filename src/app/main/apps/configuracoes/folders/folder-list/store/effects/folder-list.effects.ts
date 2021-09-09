import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
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
    /**
     * Get Folders with router parameters
     *
     * @type {Observable<any>}
     */
    getFolders: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Delete Folder
     *
     * @type {Observable<any>}
     */
    deleteFolder: Observable<FolderListActions.FolderListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<FolderListActions.DeleteFolder>(FolderListActions.DELETE_FOLDER),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'pasta',
            content: 'Apagando a pasta id ' + action.payload.folderId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._folderService.destroy(action.payload.folderId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'pasta',
                    content: 'Pasta id ' + action.payload.folderId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Folder>({
                    id: response.id,
                    schema: folderSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new FolderListActions.DeleteFolderSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.folderId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'pasta',
                    content: 'Erro ao apagar a pasta id ' + action.payload.folderId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new FolderListActions.DeleteFolderFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _folderService: FolderService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
