import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {mergeMap, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as fromStore from '../';

import {ProcessoService} from '@cdk/services/processo.service';

@Injectable()
export class ProcessoTimelineEffect {
    routerState: any;

    getTimeline: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetTimeline>(fromStore.GET_TIMELINE),
        switchMap((action) => this._processoService
            .getTimeline(action.payload)
            .pipe(
                mergeMap((response) => [
                    new fromStore.GetTimelineSuccess({data: response, id: action.payload})
                ]),
                catchError((err, ) => of(new fromStore.GetTimelineFailed(err)))
            ))
    ));

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }
}
