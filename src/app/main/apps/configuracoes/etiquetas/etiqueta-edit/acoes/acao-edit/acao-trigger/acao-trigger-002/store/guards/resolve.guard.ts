import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {AcaoTriggerState} from '../../../store/reducers';
import * as fromStore from '../../../store/';
import {getHasLoaded} from '../../../store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    triggerName: string = 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0003';

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<AcaoTriggerState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
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
        return this.getModalidadeAcaoEtiqueta().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * @returns
     */
    getModalidadeAcaoEtiqueta(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!loaded.value || loaded.value != this.triggerName) {
                    this._store.dispatch(new fromStore.GetModalidadeAcaoEtiqueta({
                        trigger: 'eq:' + this.triggerName
                    }));
                }
            }),
            filter((loaded: any) => loaded.value == this.triggerName),
            take(1)
        );
    }
}
