import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ComponentesDigitaisActions from 'app/main/apps/pesquisa/componentes-digitais/store/actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData, } from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';

@Injectable()
export class ComponentesDigitaisEffect {
    
    routerState: any;

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
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

    /**
     * Get ComponentesDigitais with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getComponentesDigitais: any =
        this._actions
            .pipe(
                ofType<ComponentesDigitaisActions.GetComponentesDigitais>(ComponentesDigitaisActions.GET_COMPONENTES_DIGITAIS),
                switchMap((action) => {
                    return this._componenteDigitalService.search(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                    new ComponentesDigitaisActions.GetComponentesDigitaisSuccess({
                        entitiesId: response['entities'].map(componenteDigital => componenteDigital.id),
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new ComponentesDigitaisActions.GetComponentesDigitaisFailed(err));
                    return caught;
                })

            );
}