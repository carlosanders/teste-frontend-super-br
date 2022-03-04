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
import {getBinary, getJuntadasLoaded} from '../../../../processo/processo-view/store';
import {getProcessoLoaded} from '../../../../processo/store';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    loadingLatestBinary: boolean = false;
    loadingProcesso = null;
    error = null;

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

        this._store
            .pipe(select(getBinary))
            .subscribe((binary) => {
                if (this.loadingProcesso === null || binary.processo !== this.loadingProcesso || !!binary.error) {
                    this.loadingLatestBinary = binary.loading;
                    this.loadingProcesso = binary.processo;
                    this.error = binary.error;
                }
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
                this.downloadLatestBinary(),
                this.getTarefa(),
                this.getProcesso(),
                this.getJuntadas()
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
     * Download Latest Binary Processo
     *
     * @returns
     */
    downloadLatestBinary(): any {
        if (this.routerState.url.includes('capa/mostrar')) {
            this.loadingLatestBinary = false;
            this.loadingProcesso = parseInt(this.routerState.params['processoCopiaHandle'] ?? this.routerState.params['processoHandle'], 10);
            return of(true);
        } else {
            return this._store.pipe(
                select(getBinary),
                tap((binary: any) => {
                    const processoId = this.routerState.params['processoHandle'];
                    if (!this.loadingLatestBinary && (!binary.src) && processoId !== 'criar' && this.loadingProcesso !== parseInt(processoId, 10)) {
                        this._store.dispatch(new fromStoreProcessoView.DownloadLatestBinary(parseInt(processoId, 10)));
                        this.loadingLatestBinary = true;
                    }
                }),
                filter((binary: any) => this.loadingLatestBinary || (!!binary.src) ||
                    (binary.processo === parseInt(this.routerState.params['processoHandle'], 10))),
                take(1)
            );
        }
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
                    this._store.dispatch(new fromStoreProcessoView.UnloadJuntadas({}));

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
                        sort: {
                            'volume.numeracaoSequencial': 'DESC',
                            'numeracaoSequencial': 'DESC',
                            'documento.componentesDigitais.numeracaoSequencial': 'ASC'
                        },
                        populate: [
                            'volume',
                            'documento',
                            'documento.origemDados',
                            'documento.tipoDocumento',
                            'documento.componentesDigitais',
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
}
