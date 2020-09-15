import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap, mergeMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositoriosActions from '../actions/repositorios.actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr';

@Injectable()
export class RepositoriosEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }
}
