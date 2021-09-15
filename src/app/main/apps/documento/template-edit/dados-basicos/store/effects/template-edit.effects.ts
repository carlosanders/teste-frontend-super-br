import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TemplateEditActions from '../actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {template as templateSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {Template} from '@cdk/models';
import {TemplateService} from '@cdk/services/template.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TemplateEditEffects {
    routerState: any;
    /**
     * Get Template with router parameters
     *
     * @type {Observable<any>}
     */
    getTemplate: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TemplateEditActions.GetTemplate>(TemplateEditActions.GET_TEMPLATE),
        switchMap(() => {
            let handle = {
                id: '',
                value: ''
            };
            const routeParams = of('documentoHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });
            return this._templateService.query(
                `{"documento.id": "eq:${handle.value}"}`,
                1,
                0,
                '{"id": "ASC"}',
                JSON.stringify([
                    'modalidadeTemplate'
                ]));
        }),
        switchMap(response => [
            new AddData<Template>({data: response['entities'], schema: templateSchema}),
            new TemplateEditActions.GetTemplateSuccess({
                loaded: {
                    id: 'documentoHandle',
                    value: this.routerState.params.documentoHandle
                },
                templateId: response['entities'][0].id,
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TemplateEditActions.GetTemplateFailed(err));
        })
    ));
    /**
     * Save Template
     *
     * @type {Observable<any>}
     */
    saveTemplate: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TemplateEditActions.SaveTemplate>(TemplateEditActions.SAVE_TEMPLATE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'template',
            content: 'Salvando o template ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._templateService.save(action.payload.template).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'template',
                content: 'Template id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Template) => [
                new AddData<Template>({data: [response], schema: templateSchema}),
                new TemplateEditActions.SaveTemplateSuccess(),
                new TemplateEditActions.GetTemplate(),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'template',
                    content: 'Erro ao salvar o template!',
                    status: 2, // erro
                }));
                return of(new TemplateEditActions.SaveTemplateFailed(err));
            })
        ))
    ));

    /**
     *
     * @param _actions
     * @param _templateService
     * @param _router
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _templateService: TemplateService,
        private _router: Router,
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
