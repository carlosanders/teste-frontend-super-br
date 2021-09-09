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
                private _loginService: LoginService) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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
        return this.getFolders().pipe(
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
        return this.getFolders().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
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
                    this._store.dispatch(new fromStore.GetFolders(
                        {
                            filter: {
                                "usuario.id": `eq:${this._profile.id}`,
                                "modalidadeFolder.valor": "eq:TAREFA"
                            },
                            limit: 10,
                            offset: 0,
                            sort: {"nome": "ASC"},
                            increment: false
                        }
                    ));
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}
