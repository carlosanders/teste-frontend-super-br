import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TemplatesEditActions from '../actions/templates-edit.actions';
import * as TemplatesListActions from '../../../templates-list/store/actions/templates-list.actions';

import {TemplateService} from '@cdk/services/template.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {template as templatesSchema} from '@cdk/normalizr';
import {Template} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TemplatesEditEffect {
    routerState: any;
    /**
     * Get Templates with router parameters
     *
     * @type {Observable<any>}
     */
    getTemplates: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TemplatesEditActions.GetTemplates>(TemplatesEditActions.GET_TEMPLATES),
        switchMap(action => this._templateService.query(
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
            JSON.stringify({isAdmin: true}))),
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
        catchError((err) => {
            console.log(err);
            return of(new TemplatesEditActions.GetTemplatesFailed(err));
        })
    ));
    /**
     * Save Templates
     *
     * @type {Observable<any>}
     */
    saveTemplates: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TemplatesEditActions.SaveTemplates>(TemplatesEditActions.SAVE_TEMPLATES),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'template',
            content: 'Salvando o template ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._templateService.save(action.payload.template, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'template',
                    content: 'Template id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Template) => [
                    new TemplatesEditActions.SaveTemplatesSuccess(),
                    new TemplatesListActions.ReloadTemplates(),
                    new AddData<Template>({data: [response], schema: templatesSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'template',
                        content: 'Erro ao salvar o template!',
                        status: 2, // erro
                    }));
                    return of(new TemplatesEditActions.SaveTemplatesFailed(err));
                })
            );
        })
    ));
    /**
     * Save Templates Success
     */
    saveTemplatesSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TemplatesEditActions.SaveTemplatesSuccess>(TemplatesEditActions.SAVE_TEMPLATES_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.templateHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _templateService: TemplateService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
