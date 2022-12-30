import {Injectable, SecurityContext} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';
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

@Injectable()
export class ComponenteDigitalEffect {
    routerState: any;
    componenteDigitalId: number;
    routeAtividadeTarefa: string;
    routeAtividadeDocumento: string;
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    createComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.CreateComponenteDigital>(ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL),
        map((action) => {

            const componenteDigital = new ComponenteDigital();
            componenteDigital.modelo = action.payload.modelo;
            componenteDigital.tarefaOrigem = action.payload.tarefaOrigem;
            componenteDigital.fileName = action.payload.modelo.nome + '.html';

            return new ComponenteDigitalActions.SaveComponenteDigital(
                {
                    componenteDigital: componenteDigital,
                    operacaoId: action.payload.operacaoId,
                    routeTarefa: action.payload.routeAtividadeTarefa,
                    routeDocumento: action.payload.routeAtividadeDocumento
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
        ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Salvando componente digital ...',
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
                new ComponenteDigitalActions.SaveComponenteDigitalSuccess({
                    componenteDigital: response,
                    tarefaId: action.payload.componenteDigital.tarefaOrigem.id
                }),
                new ComponenteDigitalActions.GetDocumento({
                    componenteDigitalId: response.id,
                    routeTarefa: action.payload.routeTarefa,
                    routeDocumento: action.payload.routeDocumento
                }),
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
                return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(payload));
            })
        ))
    ));
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumento: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetDocumento>(ComponenteDigitalActions.GET_DOCUMENTO),
        tap((action) => {
            this.componenteDigitalId = action.payload.componenteDigitalId;
            this.routeAtividadeTarefa = action.payload.routeTarefa;
            this.routeAtividadeDocumento = action.payload.routeDocumento;
        }),
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
            JSON.stringify({'incluiVinculacaoDocumentoPrincipal': true})
        )),
        switchMap(response => [
            new AddData<Documento>({
                data: response['entities'],
                schema: documentoSchema,
                populate: [
                    'processoOrigem',
                    'tarefaOrigem',
                    'componentesDigitais'
                ]
            }),
            new ComponenteDigitalActions.GetDocumentoSuccess({
                documentoId: response['entities'][0].id,
                documento: response['entities'][0],
                componenteDigitalId: this.componenteDigitalId,
                routeTarefa: this.routeAtividadeTarefa,
                routeDocumento: this.routeAtividadeDocumento
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.GetDocumentoFailed(err));
        })
    ));
    getDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetDocumentoSuccess>(ComponenteDigitalActions.GET_DOCUMENTO_SUCCESS),
        tap((action) => {
            let primary: string;
            primary = 'componente-digital/';
            const componenteDigitalId = action.payload.componenteDigitalId;

            primary += componenteDigitalId;

            const tarefaId = action.payload.documento.estaVinculada ?
                action.payload.documento.vinculacaoDocumentoPrincipal.documento.tarefaOrigem.id :
                action.payload.documento.tarefaOrigem.id;

            let url = 'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle + '/tarefa/' + tarefaId;

            if (this.routerState.params['processoHandle']) {
                let stepHandle = this.routerState.params['stepHandle'];
                const processoId = action.payload.documento.processoOrigem.id;
                if (!stepHandle || processoId !== parseInt(this.routerState.params['processoHandle'],10)) {
                    stepHandle = 'latest';
                }
                url += '/processo/' + processoId + '/visualizar/' + stepHandle;
            }

            url += '/documento/' + action.payload.documento.id

            this._router.navigate([
                    url,
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
    visualizarVersaoComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.VisualizarModelo>(ComponenteDigitalActions.VISUALIZAR_MODELO),
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
            return of(new ComponenteDigitalActions.VisualizarModeloFailed(err));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
