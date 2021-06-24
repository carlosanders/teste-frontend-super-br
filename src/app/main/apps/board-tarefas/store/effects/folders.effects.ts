import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, exhaustMap, mergeMap, switchMap} from 'rxjs/operators';

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
import {getRouterState} from '../../../../../store';

@Injectable()
export class FoldersEffect
{
    private _profile: Usuario;
    routerState: any;

    constructor(private _actions: Actions,
                private _folderService: FolderService,
                private _store: Store<FoldersState>,
                private _loginService: LoginService,
                private _router: Router)
    {
        this._profile = this._loginService.getUserProfile();
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    getFolders: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<FoldersActions.GetFolders>(FoldersActions.GET_FOLDERS),
                exhaustMap(() => this._folderService.query(
                    `{"usuario.id": "eq:${this._profile.id}", "modalidadeFolder.valor": "eq:TAREFA"}`,
                    10,
                    0,
                    '{"nome": "ASC"}')),
                mergeMap(response => {
                    return [
                        new AddData<Folder>({data: response['entities'], schema: folderSchema}),
                        new FoldersActions.GetFoldersSuccess({
                            entitiesId: response['entities'].map(folder => folder.id),
                            loaded: true,
                            total: response['total']
                        })
                    ]
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new FoldersActions.GetFoldersFailed(err));
                    return caught;
                })
            );
    });

    saveFolder: any = createEffect(() => {
        return this._actions
            .pipe(
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
                                    'folder.nome' : `eq:${response.nome.toUpperCase()}`,
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
                                    'processo.especieProcesso.workflow',
                                    'workflow'
                                ],
                                context: {}
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
            );
    });

    deleteFolder: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<FoldersActions.DeleteFolder>(FoldersActions.DELETE_FOLDER),
                mergeMap(action => this._folderService.destroy(action.payload).pipe(
                    mergeMap(response => [
                        new AddData<Folder>({data: [response], schema: folderSchema}),
                        new FoldersActions.DeleteFolderSuccess(response.id),
                        new TarefasActions.DeleteFolderTarefas(response.nome.toUpperCase())
                    ]),
                    catchError((err) => {
                        return of(new FoldersActions.DeleteFolderFailed(action.payload));
                    })
                ))
            );
    });
}
