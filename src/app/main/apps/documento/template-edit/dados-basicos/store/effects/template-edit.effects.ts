import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

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
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Template with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTemplate: any =
        this._actions
            .pipe(
                ofType<TemplateEditActions.GetTemplate>(TemplateEditActions.GET_TEMPLATE),
                switchMap(() => {
                    let handle = {
                        id: '',
                        value: ''
                    };
                    const routeParams = of('documentoHandle');
                    routeParams.subscribe(param => {
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
                            'documento',
                            'documento.tipoDocumento',
                            'documento.procedencia',
                            'documento.setorOrigem',
                            'documento.componentesDigitais',
                            'documento.componentesDigitais.assinaturas',
                            'documento.modelo',
                            'documento.modelo.template',
                            'documento.modelo.modalidadeModelo',
                            'documento.processoOrigem',
                            'documento.tarefaOrigem',
                            'documento.tarefaOrigem.processo',
                            'documento.tarefaOrigem.processo.especieProcesso',
                            'documento.tarefaOrigem.processo.especieProcesso.generoProcesso',
                            'documento.tarefaOrigem.processo.modalidadeMeio',
                            'documento.tarefaOrigem.especieTarefa',
                            'documento.tarefaOrigem.especieTarefa.generoTarefa',
                            'documento.tarefaOrigem.setorOrigem',
                            'documento.tarefaOrigem.setorOrigem.unidade',
                            'documento.tarefaOrigem.setorResponsavel',
                            'documento.tarefaOrigem.setorResponsavel.unidade',
                            'documento.tarefaOrigem.usuarioResponsavel',
                            'documento.tarefaOrigem.vinculacoesEtiquetas',
                            'documento.tarefaOrigem.vinculacoesEtiquetas.etiqueta',
                            'documento.repositorio',
                            'documento.juntadaAtual',
                            'documento.repositorio.modalidadeRepositorio',
                            'documento.documentoAvulsoRemessa',
                            'documento.documentoAvulsoRemessa.processo',
                            'documento.documentoAvulsoRemessa.processo.especieProcesso',
                            'documento.documentoAvulsoRemessa.processo.especieProcesso.generoProcesso',
                            'documento.documentoAvulsoRemessa.especieDocumentoAvulso',
                            'documento.documentoAvulsoRemessa.modelo',
                            'documento.documentoAvulsoRemessa.setorDestino',
                            'documento.documentoAvulsoRemessa.pessoaDestino',
                            'documento.documentoAvulsoRemessa.usuarioRemessa',
                            'documento.vinculacaoDocumentoPrincipal',
                            'documento.vinculacaoDocumentoPrincipal.documento',
                            'documento.vinculacaoDocumentoPrincipal.documento.documentoAvulsoRemessa',
                            'documento.vinculacoesDocumentos',
                            'documento.vinculacoesDocumentos.documentoVinculado',
                            'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                            'documento.sigilos',
                            'documento.sigilos.tipoSigilo',
                            'documento.vinculacoesEtiquetas',
                            'documento.vinculacoesEtiquetas.etiqueta',
                            'modalidadeTemplate'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Template>({data: response['entities'], schema: templateSchema}),
                    new TemplateEditActions.GetTemplateSuccess({
                        loaded: {
                            id: 'templateHandle',
                            value: response['entities'][0].id
                        },
                        templateId: response['entities'][0].id,
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TemplateEditActions.GetTemplateFailed(err));
                    return caught;
                })
            );

    /**
     * Save Template
     * @type {Observable<any>}
     */
    @Effect()
    saveTemplate: any =
        this._actions
            .pipe(
                ofType<TemplateEditActions.SaveTemplate>(TemplateEditActions.SAVE_TEMPLATE),
                switchMap((action) => {
                    return this._templateService.save(action.payload).pipe(
                        mergeMap((response: Template) => [
                            new TemplateEditActions.SaveTemplateSuccess(),
                            new AddData<Template>({data: [response], schema: templateSchema}),
                            new TemplateEditActions.GetTemplate(),
                            new OperacoesActions.Resultado({
                                type: 'template',
                                content: `Template id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TemplateEditActions.SaveTemplateFailed(err));
                        })
                    );
                })
            );
}
