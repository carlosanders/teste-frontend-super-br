import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TemplatesListActions from '../actions';

import {TemplateService} from '@cdk/services/template.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Template} from '@cdk/models';
import {template as templatesSchema} from '@cdk/normalizr/template.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class TemplatesListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _templatesService: TemplateService,
        public _loginService: LoginService,
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
     * Get Templates with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTemplates: any =
        this._actions
            .pipe(
                ofType<TemplatesListActions.GetTemplates>(TemplatesListActions.GET_TEMPLATES),
                switchMap((action) => {
                    return this._templatesService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Template>({data: response['entities'], schema: templatesSchema}),
                            new TemplatesListActions.GetTemplatesSuccess({
                                entitiesId: response['entities'].map(templates => templates.id),
                                loaded: {
                                    id: 'templateHandle',
                                    value: this.routerState.params.templateHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TemplatesListActions.GetTemplatesFailed(err));
                        })
                    );
                })
            );

}
