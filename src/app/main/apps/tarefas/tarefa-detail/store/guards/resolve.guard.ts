import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {TarefaDetailAppState} from 'app/main/apps/tarefas/tarefa-detail/store/reducers';
import * as fromStoreProcesso from 'app/main/apps/processo/store';
import * as fromStoreProcessoView from 'app/main/apps/processo/processo-view/store';
import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/store';
import {getHasLoaded} from 'app/main/apps/tarefas/tarefa-detail/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {getDocumentosHasLoaded, getJuntadasLoaded} from '../../../../processo/processo-view/store';
import {getProcessoLoaded} from '../../../../processo/store';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<TarefaDetailAppState>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

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
                console.log(err);
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
        if (this.routerState.params['processoHandle'] &&
            this.routerState.url.indexOf('/processo/' + this.routerState.params['processoHandle'] + '/visualizar') > -1) {
            return forkJoin([
                this.getTarefa(),
                this.getProcesso(),
                this.getJuntadas(),
                this.getDocumentos()
            ]).pipe(
                take(1),
            );
        } else {
            return this.getTarefa().pipe(
                take(1),
            );
        }
    }

    /**
     * Get Tarefa
     *
     * @returns
     */
    getTarefa(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetTarefa({
                        id: this.routerState.params['tarefaHandle']
                    }));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get Processo
     *
     * @returns
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['processoHandle'] === 'criar') {
                        this._store.dispatch(new fromStoreProcesso.CreateProcesso());
                    } else {
                        this._store.dispatch(new fromStoreProcesso.GetProcesso({
                            id: this.routerState.params['processoHandle']
                        }));
                    }
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get Juntadas
     *
     * @returns
     */
    getJuntadas(): any {
        return this._store.pipe(
            select(getJuntadasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStoreProcessoView.UnloadJuntadas({reset: true}));

                    let processoFilter = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoFilter = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'volume.processo.id': processoFilter,
                            'vinculada': 'eq:0'
                        },
                        listFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {'volume.numeracaoSequencial': 'DESC', 'numeracaoSequencial': 'DESC'},
                        populate: [
                            'volume',
                            'documento',
                            'documento.origemDados',
                            'documento.juntadaAtual',
                            'documento.tipoDocumento',
                            'documento.componentesDigitais',
                            'documento.vinculacoesDocumentos',
                            'documento.vinculacoesDocumentos.documentoVinculado',
                            'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                            'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
                            'documento.criadoPor',
                            'documento.setorOrigem',
                            'documento.setorOrigem.unidade',
                        ]
                    };

                    this._store.dispatch(new fromStoreProcessoView.GetJuntadas(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    getDocumentos(): any {
        if (this.routerState.params['tarefaHandle']) {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        this._store.dispatch(new fromStoreProcessoView.GetDocumentos());
                    }
                }),
                filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStoreProcessoView.UnloadDocumentos());
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }
}
