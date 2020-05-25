import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as TemplatesEditActions from '../actions/templates-edit.actions';
import * as TemplatesListActions from '../../../templates-list/store/actions/templates-list.actions';

import {TemplateService} from '@cdk/services/template.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {template as templatesSchema} from '@cdk/normalizr/template.schema';
import {Template} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class TemplatesEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _templateService: TemplateService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router
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
                ofType<TemplatesEditActions.GetTemplates>(TemplatesEditActions.GET_TEMPLATES),
                switchMap((action) => {
                    return this._templateService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'documento',
                            'modalidadeTemplate',
                            'documento.componentesDigitais',
                            'documento.tipoDocumento'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<Template>({data: response['entities'], schema: templatesSchema}),
                    new TemplatesEditActions.GetTemplatesSuccess({
                        loaded: {
                            id: 'templateHandle',
                            value: this.routerState.params.templateHandle
                        },
                        templatesId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TemplatesEditActions.GetTemplatesFailed(err));
                    return caught;
                })
            );

    /**
     * Save Templates
     * @type {Observable<any>}
     */
    @Effect()
    saveTemplates: any =
        this._actions
            .pipe(
                ofType<TemplatesEditActions.SaveTemplates>(TemplatesEditActions.SAVE_TEMPLATES),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._templateService.save(action.payload, context).pipe(
                        mergeMap((response: Template) => [
                            new TemplatesEditActions.SaveTemplatesSuccess(),
                            new TemplatesListActions.ReloadTemplates(),
                            new AddData<Template>({data: [response], schema: templatesSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TemplatesEditActions.SaveTemplatesFailed(err));
                    return caught;
                })
            );

    /**
     * Save Templates Success
     */
    @Effect({dispatch: false})
    saveTemplatesSuccess: any =
        this._actions
            .pipe(
                ofType<TemplatesEditActions.SaveTemplatesSuccess>(TemplatesEditActions.SAVE_TEMPLATES_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.templateHandle), 'listar')]).then();
                })
            );
}
