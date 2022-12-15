import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ActivateAppState} from '../reducers';
import {getHasLoaded} from '../selectors';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {getRouterState} from '../../../../../store';
import * as fromStore from '../../../../auth/activate/store';

@Injectable({providedIn: 'root'})
export class ResolveGuard implements CanActivate {
    routerState: any;

    constructor(
        private _store: Store<ActivateAppState>,
        private _router: Router,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.activate().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    activate(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                const params = {};

                const cpfHandle = of('cpfHandle');
                cpfHandle.subscribe((param) => {
                    params['cpf'] = {id: '', value: ''};
                    if (this.routerState.params[param]) {
                        params['cpf'] = {
                            id: param,
                            value: this.routerState.params[param]
                        };
                    }
                });

                const tokenHandle = of('tokenHandle');
                tokenHandle.subscribe((param) => {
                    params['token'] = {id: '', value: ''};
                    if (this.routerState.params[param]) {
                        params['token'] = {
                            id: param,
                            value: this.routerState.params[param]
                        };
                    }
                });

                const chaveAcessoHandle = of('chaveAcessoHandle');
                chaveAcessoHandle.subscribe((param) => {
                    params['context'] = '{}';
                    if (this.routerState.params[param]) {
                        params['context'] = JSON.stringify({chaveAcesso: this.routerState.params[param]});
                    }
                });

                if (!this.routerState.params['cpfHandle'] || !this.routerState.params['tokenHandle'] ||
                    (this.routerState.params['cpfHandle'] + '_' + this.routerState.params['tokenHandle']) !== loaded.value) {
                    this._store.dispatch(new fromStore.Activate(params));
                }
            })
        );
    }
}
