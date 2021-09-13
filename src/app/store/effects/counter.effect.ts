import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import * as CounterActions from 'app/store/actions/counter.action';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {CdkNavigationService} from '@cdk/components/navigation/navigation.service';

@Injectable()
export class CounterEffects {

    setCount: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CounterActions.SetCount>(CounterActions.SET_COUNT),
        tap((action): any => {
            this._cdkNavigationService.updateNavigationItem(action.payload.identifier, {
                badge: {
                    title: action.payload.count
                }
            });
        })
    ), {dispatch: false});

    /**
     * Constructor
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _cdkNavigationService: CdkNavigationService
    ) {
    }
}
