import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, filter, exhaustMap, mergeMap, switchMap} from 'rxjs/operators';

import * as FoldersActions from '../actions/folders.actions';
import * as TarefasActions from '../actions/tarefas.actions';
import {FolderService} from '@cdk/services/folder.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder, Usuario} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {FoldersState} from '../reducers';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store';

@Injectable()
export class FoldersEffect {
    routerState: any;
    getFolders: any = createEffect(() => this._actions.pipe(
        ofType<FoldersActions.GetFolders>(FoldersActions.GET_FOLDERS),
        exhaustMap(action => this._folderService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)
        )),
        mergeMap(response => [
            new AddData<Folder>({data: response['entities'], schema: folderSchema}),
            new FoldersActions.GetFoldersSuccess({
                entitiesId: response['entities'].map(folder => folder.id),
                loaded: true,
                total: response['total']
            })
        ]),
        catchError((err, caught) => {
            this._store.dispatch(new FoldersActions.GetFoldersFailed(err));
            return caught;
        })
    ));
    deleteFolder: any = createEffect(() => this._actions.pipe(
        ofType<FoldersActions.DeleteFolder>(FoldersActions.DELETE_FOLDER),
        mergeMap(action => this._folderService.destroy(action.payload).pipe(
            mergeMap(response => [
                new AddData<Folder>({data: [response], schema: folderSchema}),
                new FoldersActions.DeleteFolderSuccess(response.id),
                new TarefasActions.DeleteFolderTarefas(response.nome.toUpperCase())
            ]),
            catchError(() => of(new FoldersActions.DeleteFolderFailed(action.payload)))
        ))
    ));
    saveFolder: any = createEffect(() => this._actions.pipe(
        ofType<FoldersActions.SaveFolder>(FoldersActions.SAVE_FOLDER),
        switchMap(action => this._folderService.save(action.payload).pipe(
            mergeMap((response: Folder) => [
                new AddData<Folder>({data: [response], schema: folderSchema}),
                new FoldersActions.SaveFolderSuccess(response),
                new TarefasActions.GetTarefas({
                    pagination: {
                        filter: {
                            'usuarioResponsavel.id': 'eq:' + this._profile.id,
                            'dataHoraConclusaoPrazo': 'isNull',
                            'folder.nome': `eq:${response.nome.toUpperCase()}`,
                            'especieTarefa.generoTarefa.nome': `eq:${this.routerState.params['generoHandle'].toUpperCase()}`
                        },
                        limit: 10,
                        offset: 0,
                        sort: {dataHoraDistribuicao: 'DESC'},
                        populate: [
                            'folder',
                            'processo',
                            'colaborador.usuario',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                            'setor.unidade',
                            'processo.especieProcesso',
                            'processo.especieProcesso.generoProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'especieTarefa',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'especieTarefa.generoTarefa',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta',
                            'workflow'
                        ],
                        context: {'especieProcessoWorkflow': true}
                    },
                    nome: response.nome.toUpperCase(),
                    increment: false
                })
            ])
        )),
        catchError((err, caught) => {
            this._store.dispatch(new FoldersActions.SaveFolderFailed(err));
            return caught;
        })
    ));

    private _profile: Usuario;
    constructor(private _actions: Actions,
                private _folderService: FolderService,
                private _store: Store<FoldersState>,
                private _loginService: LoginService,
                private _router: Router) {
        this._profile = this._loginService.getUserProfile();
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
