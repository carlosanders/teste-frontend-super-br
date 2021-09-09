import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStoreProcesso from 'app/main/apps/processo/store';
import {getRouterState} from 'app/store/reducers';
import {getProcessoLoaded} from '../../../../processo/store';
import {RealizarTransicaoAppState} from '../reducers';

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
        private _store: Store<RealizarTransicaoAppState>,
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
        return forkJoin([
            this.getProcesso()
        ]).pipe(
            take(1),
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
                if (loaded.acessoNegado) {
                    this._router.navigate([this.routerState.url.split('/processo')[0] + '/processo/' + this.routerState.params.processoHandle + '/acesso-negado']).then();
                } else {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        const populate = ['classificacao', 'modalidadeFase', 'classificacao.modalidadeDestinacao'];
                        this._store.dispatch(new fromStoreProcesso.GetProcesso({
                            id: this.routerState.params['processoHandle'],
                            populate: populate
                        }));
                    }
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}
