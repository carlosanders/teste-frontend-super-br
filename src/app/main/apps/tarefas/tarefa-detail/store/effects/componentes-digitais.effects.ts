import {Injectable, SecurityContext} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DomSanitizer} from '@angular/platform-browser';
import * as fromStore from '../../store';

@Injectable()
export class ComponentesDigitaisEffects {
    routerState: any;
    componenteDigitalId: number;
    routeAtividadeDocumento: string;
    routeOficio: string;
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    createComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.CreateComponenteDigital>(fromStore.CREATE_COMPONENTE_DIGITAL),
        map((action) => {
            const componenteDigital = new ComponenteDigital();
            componenteDigital.modelo = action.payload.modelo;
            componenteDigital.tarefaOrigem = action.payload.tarefaOrigem;
            componenteDigital.fileName = action.payload.modelo.nome + '.html';

            return new fromStore.SaveComponenteDigital(
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
        ofType<fromStore.SaveComponenteDigital>(fromStore.SAVE_COMPONENTE_DIGITAL),
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
                new fromStore.SaveComponenteDigitalSuccess({
                    componenteDigital: response,
                    tarefa: action.payload.componenteDigital.tarefaOrigem
                }),
                new fromStore.GetDocumento({
                    componenteDigitalId: response.id,
                    routeDocumento: action.payload.routeDocumento
                }),
                new fromStore.GetEtiquetasTarefas(action.payload.componenteDigital.tarefaOrigem.id),
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
                return of(new fromStore.SaveComponenteDigitalFailed(payload));
            })
        ))
    ));
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumento: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetDocumento>(fromStore.GET_DOCUMENTO),
        switchMap(action => this._documentoService.query(
            `{"componentesDigitais.id": "eq:${action.payload.componenteDigitalId}"}`,
            1,
            0,
            '{}',
            JSON.stringify([
                'processoOrigem',
                'tarefaOrigem'
            ]),
            JSON.stringify({'incluiVinculacaoDocumentoPrincipal': true}))
            .pipe(
                switchMap(response => [
                    new AddData<Documento>({
                        data: response['entities'], schema: documentoSchema, populate: [
                            'processoOrigem',
                            'tarefaOrigem'
                        ]
                    }),
                    new fromStore.GetDocumentoSuccess({
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
            return of(new fromStore.GetDocumentoFailed(err));
        })
    ));
    /**
     * getDocumentoSuccess
     *
     * @type {Observable<any>}
     */
    getDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetDocumentoSuccess>(fromStore.GET_DOCUMENTO_SUCCESS),
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
            if (!stepHandle || processoId !== parseInt(this.routerState.params['processoHandle'], 10)) {
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
     * Aprovar Componente Digital
     *
     * @type {Observable<any>}
     */
    aprovarDocumento: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.AprovarDocumento>(fromStore.APROVAR_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Criando aprovação com base em documento id ' + action.payload.documento.id + ' ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const componenteDigital = new ComponenteDigital();
            componenteDigital.documentoOrigem = action.payload.documento;
            const populate = [
                'documento',
                'documento.componentesDigitais'
            ];
            this.routeAtividadeDocumento = action.payload.routeDocumento;

            return this._componenteDigitalService.aprovar(componenteDigital, JSON.stringify(populate)).pipe(
                tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Aprovação com base em documento id ' + action.payload.documento.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: ComponenteDigital) => [
                    new fromStore.AtualizaEtiquetaMinuta(action.payload.documento.id),
                    new fromStore.AprovarDocumentoSuccess(response),
                    new AddData<ComponenteDigital>({
                        data: [{...action.payload, ...response}],
                        schema: componenteDigitalSchema,
                        populate: populate
                    }),
                    new fromStore.GetDocumento({
                        componenteDigitalId: response.id,
                        routeDocumento: action.payload.routeDocumento
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'componente digital',
                        content: 'Ocorreu um erro ao criar aprovação.',
                        status: 2, // erro
                    }));
                    return of(new fromStore.AprovarDocumentoFailed(err));
                })
            );
        })
    ));
    /**
     * Visualizar Modelo
     *
     * @type {Observable<any>}
     */
    visualizarVersaoComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.VisualizarModelo>(fromStore.VISUALIZAR_MODELO),
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
            return of(new fromStore.VisualizarModeloFailed(err));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router,
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
