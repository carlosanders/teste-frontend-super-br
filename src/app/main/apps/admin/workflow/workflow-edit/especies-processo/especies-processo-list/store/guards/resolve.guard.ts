import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {WorkflowEspecieProcessoListAppState} from '../reducers';
import {getEspecieProcessoListLoaded} from '../index';


@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     */
    constructor(
        private _store: Store<WorkflowEspecieProcessoListAppState>
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
        return this.getEspecieProcesso().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get EspecieProcesso
     *
     * @returns
     */
    getEspecieProcesso(): Observable<any> {
        return this._store.pipe(
            select(getEspecieProcessoListLoaded),
            tap((loaded: any) => {
                if (!loaded) {

                    const params = {
                        filter: {
                            'workflow.id': 'eq:' + this.routerState.params.workflowHandle
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll'
                        ],
                        context: {isAdmin: true},
                        deletingIds: [],
                        deletedIds: []
                    };

                    this._store.dispatch(new fromStore.GetEspecieProcesso(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }

}
