import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, forkJoin, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter, withLatestFrom, concatMap} from 'rxjs/operators';

import {BoardTarefasAppState} from '../reducers';
import * as fromStore from '../../store';
import {getFoldersLoaded, getFolderTarefasIsLoading, getFolders as getFoldersList} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Folder, Usuario} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(private _store: Store<BoardTarefasAppState>,
                private _loginService: LoginService)
    {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                return of(false);
            })
        );
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        //@todo ver erro quando não tem nenhum folder cadastrado...
        return forkJoin(
            this.getFolders()
        ).pipe(
            filter(([foldersLoaded]) => !!(foldersLoaded)),
            take(1),
            switchMap(() =>this.getAllTarefas())
        );
    }

    /**
     * Get folders
     *
     * @returns
     */
    getFolders(): any {
        return this._store.pipe(
            select(getFoldersLoaded),
            tap((loaded) => {
                if (!loaded) {
                    this._store.dispatch(new fromStore.GetFolders([]));
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }

    /**
     * Get Tarefas
     *
     * @returns
     */
    getAllTarefas(): any {
        return this._store.pipe(
            select(getFolderTarefasIsLoading),
            withLatestFrom(this._store.pipe(select(getFoldersList))),
            tap(([loaded, folders]) => {
                if (!loaded) {

                    const params = {
                        listFilter: {},
                        etiquetaFilter: {},
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
                    };

                    let genero = this.routerState.params['generoHandle'].toUpperCase();

                    this.getTarefasEntrada(genero, params);

                    folders.forEach((folder) => {
                        this.getTarefasFolder(folder, genero, params);
                    });

                    // this.getTarefasLixeira(genero, params);
                }
            }),
            filter((loaded: any) => loaded),
            take(1)
        );
    }

    getTarefasEntrada(genero: string, params: any): void
    {
        let filter = {
            'usuarioResponsavel.id': 'eq:' + this._profile.id,
            'dataHoraConclusaoPrazo': 'isNull',
            'especieTarefa.generoTarefa.nome': `eq:${genero.toUpperCase()}`,
            'folder.nome': 'isNull'
        };
        params.context = {modulo: genero};
        params['filter'] = filter;
        this._store.dispatch(new fromStore.GetTarefas({
            pagination: {
                ...params
            },
            nome: 'ENTRADA',
            increment: false
        }));
    }

    getTarefasLixeira(genero: string, params: any): void
    {
        let filter = {
            'usuarioResponsavel.id': 'eq:' + this._profile.id,
            'dataHoraConclusaoPrazo': 'isNull',
            'especieTarefa.generoTarefa.nome': `eq:${genero.toUpperCase()}`,
            'folder.nome': 'isNull',
            'apagadoEm': 'isNotNull'
        };

        params.context = {
            modulo: genero,
            mostrarApagadas: true
        };

        params['filter'] = filter;
        this._store.dispatch(new fromStore.GetTarefas({
            pagination: {
                ...params
            },
            nome: 'LIXEIRA',
            increment: false
        }));
    }

    getTarefasFolder(folder:Folder, genero: string, params: any): void
    {
        let filter = {
            'usuarioResponsavel.id': 'eq:' + this._profile.id,
            'dataHoraConclusaoPrazo': 'isNull',
            'folder.nome' : `eq:${folder.nome.toUpperCase()}`,
            'especieTarefa.generoTarefa.nome': `eq:${genero.toUpperCase()}`
        };

        params['filter'] = filter;

        this._store.dispatch(new fromStore.GetTarefas({
            pagination: {
                ...params
            },
            nome: folder.nome.toUpperCase(),
            increment: false
        }));
    }
}
