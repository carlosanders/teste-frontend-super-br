import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ComponentesDigitaisActions from 'app/main/apps/pesquisa/componentes-digitais/store/actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';

@Injectable()
export class ComponentesDigitaisEffect {
    routerState: any;
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    getComponentesDigitais: any = createEffect(() => this._actions.pipe(
        ofType<ComponentesDigitaisActions.GetComponentesDigitais>(ComponentesDigitaisActions.GET_COMPONENTES_DIGITAIS),
        switchMap(action => this._componenteDigitalService.search(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate)).pipe(
            mergeMap(response => [
                new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                new ComponentesDigitaisActions.GetComponentesDigitaisSuccess({
                    entitiesId: response['entities'].map(componenteDigital => componenteDigital.id),
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ComponentesDigitaisActions.GetComponentesDigitaisFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
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
