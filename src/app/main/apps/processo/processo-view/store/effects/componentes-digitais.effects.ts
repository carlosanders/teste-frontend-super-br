import {Injectable, SecurityContext} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

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
import {GetDocumentos} from '../actions';
import * as fromStoreTarefaDetail from '../../../../tarefas/tarefa-detail/store';
import {DomSanitizer} from '@angular/platform-browser';
import * as fromStore from '../../store';

@Injectable()
export class ComponentesDigitaisEffects {
    routerState: any;
    componenteDigitalId: number;
    routeAtividadeDocumento: string;
    routeOficio: string;

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    createComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.CreateComponenteDigital>(ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL),
                map((action) => {

                    const componenteDigital = new ComponenteDigital();
                    componenteDigital.modelo = action.payload.modelo;
                    componenteDigital.tarefaOrigem = action.payload.tarefaOrigem;
                    componenteDigital.fileName = action.payload.modelo.nome + '.html';

                    return new ComponenteDigitalActions.SaveComponenteDigital(
                        {
                            componenteDigital: componenteDigital,
                            routeDocumento: action.payload.routeAtividadeDocumento
                        }
                    );
                }),
            );

    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
                switchMap(action => this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
                        tap((response) => {
                            this._store.dispatch(new GetDocumentos());
                            if (this.routerState.params['tarefaHandle']) {
                                this._store.dispatch(new fromStoreTarefaDetail.GetTarefa({
                                    id: this.routerState.params['tarefaHandle']
                                }));
                            }
                        }),
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                            new ComponenteDigitalActions.GetDocumento({
                                componenteDigitalId: response.id,
                                routeDocumento: action.payload.routeDocumento
                            }),
                            new AddData<ComponenteDigital>({
                                data: [{...action.payload.componenteDigital, ...response}],
                                schema: componenteDigitalSchema
                            }),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                        })
                    ))
            );


    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumento: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.GetDocumento>(ComponenteDigitalActions.GET_DOCUMENTO),
                tap((action) => {
                        this.componenteDigitalId = action.payload.componenteDigitalId;
                        this.routeAtividadeDocumento = action.payload.routeDocumento;
                    }
                ),
                switchMap(action => this._documentoService.query(
                        `{"componentesDigitais.id": "eq:${action.payload.componenteDigitalId}"}`,
                        1,
                        0,
                        '{}',
                        '[]')),
                switchMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new ComponenteDigitalActions.GetDocumentoSuccess({
                        documentoId: response['entities'][0].id,
                        componenteDigitalId: this.componenteDigitalId,
                        routeDocumento: this.routeAtividadeDocumento
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.GetDocumentoFailed(err));
                    return caught;
                })
            );

    @Effect({dispatch: false})
    getDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.GetDocumentoSuccess>(ComponenteDigitalActions.GET_DOCUMENTO_SUCCESS),
                tap((action) => {
                    const primary = 'componente-digital/' + action.payload.componenteDigitalId;
                    const sidebar = 'editar/' + action.payload.routeDocumento;

                    this._router.navigate([
                            this.routerState.url.split('processo/')[0] + 'processo/' + this.routerState.params.processoHandle
                            + '/visualizar/' + this.routerState.params.stepHandle + '/documento/' + action.payload.documentoId,
                            {
                                outlets: {
                                    primary: primary,
                                    sidebar: sidebar
                                }
                            }
                        ],
                        {
                            relativeTo: this._activatedRoute.parent
                        }).then();
                })
            );

    /**
     * Visualizar Modelo
     *
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    visualizarVersaoComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.VisualizarModelo>(ComponenteDigitalActions.VISUALIZAR_MODELO),
                switchMap((action) => {
                    let handle = { id: '', value: '' };
                    handle = {
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
                            setTimeout( () => {
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
                            setTimeout( () => {
                                // For Firefox it is necessary to delay revoking the ObjectURL
                                window.URL.revokeObjectURL(sanitizedUrl);
                            }, 100);
                        }
                    }
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.VisualizarModeloFailed(err));
                    return caught;
                })
            );

    /**
     * Visualizar Juntada em outra aba
     *
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    visualizarJuntada: any =
        this._actions
        .pipe(
            ofType<ComponenteDigitalActions.VisualizarJuntada>(ComponenteDigitalActions.VISUALIZAR_JUNTADA),
            switchMap((action) => {
                 let handle = { id: '', value: '' };
                 handle = {
                     id: 'documento',
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
                         setTimeout( () => {
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
                         setTimeout( () => {
                             // For Firefox it is necessary to delay revoking the ObjectURL
                             window.URL.revokeObjectURL(sanitizedUrl);
                         }, 100);
                     }
                 }
             }),
             catchError((err, caught) => {
                 console.log(err);
                 this._store.dispatch(new ComponenteDigitalActions.VisualizarJuntadaFailed(err));
                 return caught;
             })
         );

    /**
     * Aprovar Componente Digital
     *
     * @type {Observable<any>}
     */
    @Effect()
    aprovarComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.AprovarComponenteDigital>(ComponenteDigitalActions.APROVAR_COMPONENTE_DIGITAL),
                switchMap((action) => {
                    const componenteDigital = new ComponenteDigital();
                    componenteDigital.documentoOrigem = action.payload.documentoOrigem;

                    return this._componenteDigitalService.aprovar(componenteDigital).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.AprovarComponenteDigitalSuccess(response),
                            new AddData<ComponenteDigital>({data: [{...action.payload, ...response}], schema: componenteDigitalSchema}),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new fromStore.GetDocumentosVinculados(action.payload.documentoOrigem)
                        ]),
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                    return caught;
                })
            );
}
