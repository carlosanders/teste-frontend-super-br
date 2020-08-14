import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import * as CounterActions from 'app/store/actions/counter.action';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {CdkNavigationService} from '../../../@cdk/components/navigation/navigation.service';

@Injectable()
export class CounterEffects {

    /**
     * Constructor
     */
    constructor(
        private _actions$: Actions,
        private _store: Store<State>,
        private _cdkNavigationService: CdkNavigationService
    ) {}

    @Effect({dispatch: false})
    setCount: Observable<any> =
        this._actions$
            .pipe(
                ofType<CounterActions.SetCount>(CounterActions.SET_COUNT),
                tap((action): any => {
                    this._cdkNavigationService.updateNavigationItem(action.payload.identifier, {
                        badge    : {
                            title    : action.payload.count
                        }
                    });
                })
            );

}
