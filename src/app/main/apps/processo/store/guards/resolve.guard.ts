import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ProcessoAppState} from 'app/main/apps/processo/store/reducers';
import * as fromStore from 'app/main/apps/processo/store';
import {getProcessoLoaded} from 'app/main/apps/processo/store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    needsPopulatedProcesso: any[] = ['vinculacoesEtiquetas', 'vinculacoesEtiquetas.etiqueta'];

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<ProcessoAppState>,
        private _router: Router
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
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getProcesso().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     *
     * @param loaded
     * @param needs
     */
    isPopulated(loaded, needs): boolean {
        if (needs.length && loaded.value !== 'criar') {
            needs.forEach((need) => {
                if (loaded.populate.indexOf(need) === -1) {
                    return false;
                }
            });
        }
        return true;
    }

    /**
     * Get Processo
     *
     * @returns {Observable<any>}
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (loaded.acessoNegado) {
                    this._router.navigate([this.routerState.url.split('/processo')[0] + '/processo/' + this.routerState.params.processoHandle + '/acesso-negado']).then();
                } else {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value || !this.isPopulated(loaded, this.needsPopulatedProcesso)) {
                        if (this.routerState.params['processoHandle'] === 'criar') {
                            this._store.dispatch(new fromStore.CreateProcesso());
                        } else {
                            this._store.dispatch(new fromStore.GetProcesso({
                                filtar: {id: 'eq:' + this.routerState.params['processoHandle']},
                                populate: this.needsPopulatedProcesso
                            }));
                        }
                    }
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value && this.isPopulated(loaded, this.needsPopulatedProcesso);
            }),
            take(1)
        );
    }

}


