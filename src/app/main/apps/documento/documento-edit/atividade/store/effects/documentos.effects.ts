import {Injectable, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@cdk/angular/material';
import {ComponenteDigital, Documento} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkUtils} from '@cdk/utils';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {getRouterState, State} from 'app/store/reducers';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as fromDocumentoStore from '../../../../store';
import * as fromStore from '../../store';
import * as DocumentosActionsAll from '../actions/documentos.actions';
import {GetEtiquetasTarefas} from '../../../../../tarefas/store';

@Injectable()
export class DocumentosEffects {
    routerState: any;
    componenteDigitalId: number;
    routeAtividadeDocumento: string;
    routeOficio: string;
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.GetDocumentos>(DocumentosActionsAll.GET_DOCUMENTOS),
        withLatestFrom(this._store.pipe(select(fromDocumentoStore.getDocumento))),
        mergeMap(([action, documento]) => {
            const tarefaId = this.routerState.params['tarefaHandle'] ?? documento.tarefaOrigem.id;
            const params = {
                filter: {
                    'tarefaOrigem.id': 'eq:' + tarefaId,
                    'documentoAvulsoRemessa.id': 'isNull',
                    'juntadaAtual': 'isNull'
                },
                limit: action.payload.limit,
                offset: action.payload.offset,
                sort: {
                    id: 'ASC'
                },
                populate: [
                    'tipoDocumento',
                    'componentesDigitais',
                ],
                context: {'verificaAnexos': true}
            };

            return this._documentoService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate),
                JSON.stringify(params.context)
            ).pipe(
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentosActionsAll.GetDocumentosSuccess({
                        loaded: {
                            id: this.routerState.params['tarefaHandle'] ? 'tarefaHandle' : 'documentoHandle',
                            value: this.routerState.params['tarefaHandle'] ?? this.routerState.params['documentoHandle']
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                        total: response['total']
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActionsAll.GetDocumentosFailed(err));
                })
            );
        }),
    ));
    getDocumentosSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.GetDocumentosSuccess>(DocumentosActionsAll.GET_DOCUMENTOS_SUCCESS),
        withLatestFrom(this._store.select(fromStore.getDocumentosPagination), this._store.select(fromStore.getDocumentosIds)),
        tap(([action, pagination, documentosIds]) => {
            if (action.payload.total > documentosIds.length) {
                this._store.dispatch(new DocumentosActionsAll.GetDocumentos({
                    limit: pagination.limit,
                    offset: pagination.offset + pagination.limit
                }));
            }
        })
    ), {dispatch: false});
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.UpdateDocumento>(DocumentosActionsAll.UPDATE_DOCUMENTO),
        mergeMap((action) => {
            const populate = JSON.stringify([
                'tipoDocumento',
                'atualizadoPor'
            ]);
            return this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}, populate).pipe(
                mergeMap((response: Documento) => [
                    new DocumentosActionsAll.UpdateDocumentoSuccess(response.id),
                    new AddData<Documento>({data: [response], schema: documentoSchema}),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActionsAll.UpdateDocumentoFailed(err));
                })
            );
        }, 25)
    ));

    converteMinutaEmAnexo: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.ConverteMinutaEmAnexo>(DocumentosActionsAll.CONVERTE_MINUTA_EM_ANEXO),
        tap((action) => this._store.dispatch(new OperacoesActions.Operacao(action.payload.operacao))),
        mergeMap((action) => {
            return this._documentoService.converteMinutaEmAnexo(
                action.payload.documentoOrigem,
                action.payload.documentoDestino,
                JSON.stringify([
                    'tipoDocumento',
                    'tarefaOrigem',
                    'atualizadoPor'
                ]),
                JSON.stringify({'verificaAnexos': true})
            ).pipe(
                tap((response: Documento) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacao.id,
                        type: action.payload.operacao.type,
                        content: `Minuta id ${action.payload.documentoOrigem.id} convertida em anexo com sucesso!`,
                        status: 1, // sucesso
                        redo: 'inherent',
                        undo: 'inherent'
                    }));

                    this._store.dispatch(new AddData<Documento>({data: [response], schema: documentoSchema}));
                    this._store.dispatch(new fromDocumentoStore.CriadoAnexoDocumento(response.id));
                    this._store.dispatch(new DocumentosActionsAll.RemoveMinutasTarefa({
                        documentos: [action.payload.documentoOrigem],
                        tarefaId: response.tarefaOrigem.id
                    }));
                    this._store.dispatch(new fromDocumentoStore.RemovidoAnexoDocumento(response.id));
                    if (action.payload.documentoDestino.id === +this.routerState.params['documentoHandle']) {
                        this._store.dispatch(new fromStore.ReloadDocumentosVinculados());
                    }

                    if (action.payload.documentoOrigem.id === +this.routerState.params['documentoHandle']) {
                        this._componenteDigitalService.saving.next(false);
                        this._router.navigate([
                                this.routerState.url.split('/documento/' + this.routerState.params['documentoHandle'])[0] +
                                '/documento/' + action.payload.documentoDestino.id,
                                {
                                    outlets: {
                                        sidebar: 'editar/atividade'
                                    }
                                }],
                            {
                                relativeTo: this._activatedRoute.parent,
                                queryParams: {lixeira: null}
                            }).then();
                    }
                }),
                mergeMap((response: Documento) => [
                    new DocumentosActionsAll.ConverteMinutaEmAnexoSuccess(response),
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacao.id,
                        type: 'documento',
                        content: `Erro ao converter modelo id ${action.payload.documentoOrigem.id} em anexo da minuta id ${action.payload.documentoDestino.id}!`,
                        status: 2, // erro
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    this._snackBar.open(CdkUtils.errorsToString(err), null, {
                        duration: 5000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['danger-snackbar']
                    });
                    return of(new DocumentosActionsAll.ConverteMinutaEmAnexoFailed({
                        documentoOrigem: action.payload.documentoOrigem,
                        documentoDestino: action.payload.documentoDestino,
                        error: err
                    }));
                })
            );
        })
    ));
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    createComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.CreateComponenteDigital>(DocumentosActionsAll.CREATE_COMPONENTE_DIGITAL),
        map((action) => {
            const componenteDigital = new ComponenteDigital();
            componenteDigital.modelo = action.payload.modelo;
            componenteDigital.tarefaOrigem = action.payload.tarefaOrigem;
            componenteDigital.fileName = action.payload.modelo.nome + '.html';

            return new DocumentosActionsAll.SaveComponenteDigitalMinuta(
                {
                    componenteDigital: componenteDigital,
                    routeDocumento: action.payload.routeAtividadeDocumento,
                    operacaoId: action.payload.operacaoId
                }
            );
        }),
    ));
    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    saveComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.SaveComponenteDigitalMinuta>(DocumentosActionsAll.SAVE_COMPONENTE_DIGITAL_MINUTA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Criando componente digital ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'componente digital',
                content: `Componente digital id ${response.id} criado com sucesso!`,
                status: 1, // sucesso
            }))),
            mergeMap((response: ComponenteDigital) => [
                new DocumentosActionsAll.SaveComponenteDigitalMinutaSuccess({
                    componenteDigital: response,
                    tarefa: action.payload.componenteDigital.tarefaOrigem
                }),
                new DocumentosActionsAll.GetDocumento({
                    componenteDigitalId: response.id,
                    routeDocumento: action.payload.routeDocumento
                }),
                new GetEtiquetasTarefas(action.payload.componenteDigital.tarefaOrigem.id),
                new AddData<ComponenteDigital>({
                    data: [{...action.payload.componenteDigital, ...response}],
                    schema: componenteDigitalSchema
                })
            ]),
            catchError((err) => {
                console.log(err);
                const payload = {
                    id: action.payload.componenteDigital.tarefaOrigem.id,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Ocorreu um erro ao salvar o componente digital.',
                    status: 2, // erro
                }));
                return of(new DocumentosActionsAll.SaveComponenteDigitalMinutaFailed(payload));
            })
        ))
    ));
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.GetDocumento>(DocumentosActionsAll.GET_DOCUMENTO),
        switchMap(action => this._documentoService.query(
            `{"componentesDigitais.id": "eq:${action.payload.componenteDigitalId}"}`,
            1,
            0,
            '{}',
            JSON.stringify([
                'processoOrigem',
                'tarefaOrigem',
                'componentesDigitais'
            ]),
            JSON.stringify({'incluiVinculacaoDocumentoPrincipal': true}))
            .pipe(
                switchMap(response => [
                    new AddData<Documento>({
                        data: response['entities'], schema: documentoSchema, populate: [
                            'processoOrigem',
                            'tarefaOrigem',
                            'componentesDigitais'
                        ]
                    }),
                    new DocumentosActionsAll.GetDocumentoSuccess({
                        documentoId: response['entities'][0].id,
                        documento: response['entities'][0],
                        componenteDigitalId: action.payload.componenteDigitalId,
                        routeDocumento: action.payload.routeDocumento
                    }),
                ])
            )
        ),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosActionsAll.GetDocumentoFailed(err));
        })
    ));
    /**
     * getDocumentoSuccess
     *
     * @type {Observable<any>}
     */
    getDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.GetDocumentoSuccess>(DocumentosActionsAll.GET_DOCUMENTO_SUCCESS),
        tap((action) => {
            let stepHandle = this.routerState.params['stepHandle'];
            let primary: string;
            primary = 'componente-digital/';
            const componenteDigitalId = action.payload.componenteDigitalId;

            primary += componenteDigitalId;

            const tarefaId = action.payload.documento.estaVinculada ?
                action.payload.documento.vinculacaoDocumentoPrincipal.documento.tarefaOrigem.id :
                action.payload.documento.tarefaOrigem.id;
            const processoId = action.payload.documento.processoOrigem.id;
            if (!stepHandle || processoId !== parseInt(this.routerState.params['processoHandle'],10)) {
                stepHandle = 'latest';
            }

            this._router.navigate([
                    'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                    + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/processo/' + processoId + '/visualizar/'
                    + stepHandle + '/documento/' + action.payload.documento.id,
                    {
                        outlets: {
                            primary: primary
                        }
                    }
                ],
                {
                    relativeTo: this._activatedRoute.parent
                }).then();
        })
    ), {dispatch: false});
    /**
     * Visualizar Modelo
     *
     * @type {Observable<any>}
     */
    visualizarModeloComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.VisualizarModelo>(DocumentosActionsAll.VISUALIZAR_MODELO),
        switchMap((action) => {
            const handle = {
                id: 'modelo',
                value: action.payload
            };
            return this._componenteDigitalService.download(handle.value);
        }),
        tap((response: any) => {
            if (response && response.conteudo) {
                const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                // Adicionado \ufeff para criar o Blob como utf-8
                const blob = new Blob(['\ufeff', byteArray], {type: response.mimetype});
                const URL = window.URL;
                if (response.mimetype === 'application/pdf' || response.mimetype === 'text/html') {
                    const data = URL.createObjectURL(blob);
                    window.open(data, '_blank');
                    setTimeout(() => {
                        // For Firefox it is necessary to delay revoking the ObjectURL
                        window.URL.revokeObjectURL(data);
                    }, 100);
                } else {
                    const downloadUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                    const downloadLink = document.createElement('a');
                    const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, downloadUrl);
                    downloadLink.target = '_blank';
                    downloadLink.href = sanitizedUrl;
                    downloadLink.download = response.fileName;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    setTimeout(() => {
                        // For Firefox it is necessary to delay revoking the ObjectURL
                        window.URL.revokeObjectURL(sanitizedUrl);
                    }, 100);
                }
            }
        }),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosActionsAll.VisualizarModeloFailed(err));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _store: Store<State>,
        private _snackBar: MatSnackBar,
        private _componenteDigitalService: ComponenteDigitalService,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
