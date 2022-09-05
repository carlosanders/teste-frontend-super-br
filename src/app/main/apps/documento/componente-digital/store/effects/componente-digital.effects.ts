import {Injectable, SecurityContext} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componente-digital.actions';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {select, Store} from '@ngrx/store';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DomSanitizer} from '@angular/platform-browser';
import {getDocumento} from '../../../store';
import {getComponenteDigitalLoaded} from '../selectors';
import * as AssinaturaActions from 'app/store/actions/assinatura.actions';
import {CacheGenericUserDataService} from '@cdk/services/cache.service';
import {
    ComponenteDigitalCkeditorComponent
} from '../../componente-digital-ckeditor/componente-digital-ckeditor.component';

@Injectable()
export class ComponenteDigitalEffect {
    routerState: any;
    lixeira = false;
    documento: Documento;
    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    downloadComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DownloadComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL),
        switchMap(() => {
            let handle = {id: '', value: ''};
            let context: any = '{}';
            const routeParams = of('componenteDigitalHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });
            const routeChaveAcessoParams = of('chaveAcessoHandle');
            routeChaveAcessoParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    context = JSON.stringify({'chaveAcesso': this.routerState.params[param]});
                }
            });
            if (this.lixeira) {
                context = JSON.stringify({'mostrarApagadas': true});
            }
            return this._componenteDigitalService.download(handle.value, context).pipe(
                mergeMap(response => [
                    new UpdateData<ComponenteDigital>({
                        id: response.id,
                        schema: componenteDigitalSchema,
                        changes: {
                            conteudo: response.conteudo, mimetype: response.mimetype,
                            fileName: response.fileName, unsafe: response.unsafe,
                            extensao: response.extensao, convertidoPdf: response.convertidoPdf,
                            assinado: response.assinado, editavel: response.editavel
                        }
                    }),
                    new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                        componenteDigitalId: response.id,
                        componenteDigital: response,
                        loaded: {
                            id: 'componenteDigitalHandle',
                            value: response.id
                        }
                    }),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
                })
            );
        })
    ));
    downloadComponenteDigitalSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DownloadComponenteDigitalSuccess>(ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS),
        withLatestFrom(this._store.select(getDocumento), this._store.select(getComponenteDigitalLoaded)),
        tap(([action, documento, loaded]) => {
            if (loaded.exibido !== action.payload.componenteDigitalId) {
                // this._componenteDigitalService.trocandoDocumento.next(true);
                let primary: string;
                primary = 'componente-digital/';
                const componenteDigital = action.payload.componenteDigital;

                primary += componenteDigital.id;

                if (componenteDigital && componenteDigital.editavel && !componenteDigital.assinado && !componenteDigital.apagadoEm && documento.minuta) {
                    primary += '/editor/ckeditor';
                } else {
                    primary += '/visualizar';
                }

                let sidebar = this.routerState.url.replace(')', '').split('sidebar:')[1]?.split('?')[0];
                // eslint-disable-next-line max-len
                if ((!documento?.minuta || documento?.estaVinculada || action.payload.componenteDigital?.documentoOrigem) && sidebar?.includes('editar/atividade')) {
                    sidebar = 'editar/dados-basicos';
                }
                const url = this.routerState.url.includes('/processo/' + this.routerState.params.processoHandle + '/visualizar') ?
                    this.routerState.url.split('/processo/' + this.routerState.params.processoHandle + '/visualizar/' + this.routerState.params.stepHandle)[0] +
                    '/processo/' + this.routerState.params.processoHandle + '/visualizar/' + this.routerState.params.stepHandle +
                    '/documento/' + this.routerState.params.documentoHandle :
                    this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params.documentoHandle;
                this._router.navigate([url, {outlets: {primary: primary, sidebar: sidebar}}],
                    {
                        relativeTo: this._activatedRoute.parent
                    }
                ).then(() => {
                    const loadedExibido = {
                        ...action.payload.loaded,
                        exibido: action.payload.componenteDigitalId
                    };
                    this._store.dispatch(new ComponenteDigitalActions.ComponenteDigitalExibido(loadedExibido));
                });
            }
        })
    ), {dispatch: false});
    /**
     * Visualizar Versão ComponenteDigital
     *
     * @type {Observable<any>}
     */
    visualizarVersaoComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.VisualizarVersaoComponenteDigital>(ComponenteDigitalActions.VISUALIZAR_VERSAO_COMPONENTE_DIGITAL),
        switchMap((action) => {
            let handle = {id: '', value: ''};
            const routeParams = of('componenteDigitalHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });
            const context = JSON.stringify({versao: action.payload});
            return this._componenteDigitalService.download(handle.value, context);
        }),
        tap((response: any) => {
            if (response && response.conteudo) {
                const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
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
            return of(new ComponenteDigitalActions.VisualizarVersaoComponenteDigitalFailed(err));
        })
    ), {dispatch: false});
    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    compararVersaoComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.CompararVersaoComponenteDigital>(ComponenteDigitalActions.COMPARAR_VERSAO_COMPONENTE_DIGITAL),
        switchMap((action) => {
            let handle = {id: '', value: ''};
            const routeParams = of('componenteDigitalHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });
            const context = JSON.stringify({compararVersao: action.payload});
            return this._componenteDigitalService.download(handle.value, context);
        }),
        tap((response: any) => {
            if (response && response.conteudo) {
                const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: response.mimetype});
                const URL = window.URL;
                const data = URL.createObjectURL(blob);
                window.open(data, '_blank');

                setTimeout(() => {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data);
                }, 100);

            }
        }),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.CompararVersaoComponenteDigitalFailed(err));
        })
    ), {dispatch: false});
    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    downloadAsPdfComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DownloadAsPdfComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL),
        switchMap(() => {
            let handle = {
                id: '',
                value: ''
            };
            const routeParams = of('componenteDigitalHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });
            return this._componenteDigitalService.download(handle.value, JSON.stringify({asPdf: true}));
        }),
        tap((response) => {
            if (response && response.conteudo) {
                const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: response.mimetype});
                const URL = window.URL;
                const data = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = data;
                link.target = '_blank';
                link.download = response.fileName;
                // this is necessary as link.click() does not work on the latest firefox
                link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

                setTimeout(() => {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data);
                    link.remove();
                }, 100);

            }
        }),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.DownloadAsPdfComponenteDigitalFailed(err));
        })
    ), {dispatch: false});
    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    saveComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Salvando componente digital ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._componenteDigitalService.patch(action.payload.componenteDigital, {
            conteudo: action.payload.data,
            hashAntigo: action.payload.hashAntigo
        }).pipe(
            tap(response => {
                this._cacheGenericUserDataService
                    .get(ComponenteDigitalCkeditorComponent.LocalStorageBackupKey)
                    .subscribe((cachedComponenteDigitalBackupList) => {
                        const componenteDigitalBackupList = cachedComponenteDigitalBackupList || [];
                        this._cacheGenericUserDataService.set(
                            componenteDigitalBackupList.filter((backup) => backup.id !== action.payload.componenteDigital.id),
                            ComponenteDigitalCkeditorComponent.LocalStorageBackupKey,
                            (60 * 60 * 24 * 30) //30 dias
                        ).subscribe();
                    });
                return this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: `Componente Digital id ${response.id} salvo com sucesso!`,
                    status: 1, // sucesso
                }))
            }),
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                new UpdateData<ComponenteDigital>({
                    id: response.id,
                    schema: componenteDigitalSchema,
                    changes: {conteudo: response.conteudo, hash: response.hash, atualizadoEm: response.atualizadoEm}
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Erro ao salvar o componente digital!',
                    status: 2, // erro
                }));
                return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
            })
        ))
    ));
    /**
     * AutoSave ComponenteDigital
     *
     * @type {Observable<any>}
     */
    autoSaveComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.AutoSaveComponenteDigital>(ComponenteDigitalActions.AUTO_SAVE_COMPONENTE_DIGITAL),
        switchMap(action => this._componenteDigitalService.patch(action.payload.componenteDigital, {
            conteudo: action.payload.data,
            hashAntigo: action.payload.hashAntigo
        }).pipe(
            tap(response => {
                this._cacheGenericUserDataService
                    .get(ComponenteDigitalCkeditorComponent.LocalStorageBackupKey)
                    .subscribe((cachedComponenteDigitalBackupList) => {
                        const componenteDigitalBackupList = cachedComponenteDigitalBackupList || [];
                        this._cacheGenericUserDataService.set(
                            componenteDigitalBackupList.filter((backup) => backup.id !== action.payload.componenteDigital.id),
                            ComponenteDigitalCkeditorComponent.LocalStorageBackupKey,
                            (60 * 60 * 24 * 30) //30 dias
                        ).subscribe();
                    });
            }),
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.AutoSaveComponenteDigitalSuccess(response),
                new UpdateData<ComponenteDigital>({
                    id: response.id,
                    schema: componenteDigitalSchema,
                    changes: {conteudo: response.conteudo, hash: response.hash, atualizadoEm: response.atualizadoEm}
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ComponenteDigitalActions.AutoSaveComponenteDigitalFailed(err));
            })
        ))
    ));
    /**
     * Revert ComponenteDigital
     *
     * @type {Observable<any>}
     */
    revertComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.RevertComponenteDigital>(ComponenteDigitalActions.REVERT_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Revertendo componente digital ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._componenteDigitalService.reverter(action.payload.componenteDigital, {hash: action.payload.hash}).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'componente digital',
                content: `Componente Digital id ${response.id} revertido com sucesso!`,
                status: 1, // sucesso
            }))),
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.RevertComponenteDigitalSuccess(response),
                new UpdateData<ComponenteDigital>({
                    id: response.id,
                    schema: componenteDigitalSchema,
                    changes: {conteudo: response.conteudo, hash: response.hash}
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Erro ao reverter o componente digital!',
                    status: 2, // erro
                }));
                return of(new ComponenteDigitalActions.RevertComponenteDigitalFailed(err));
            })
        ))
    ));
    revertComponenteDigitalSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.RevertComponenteDigitalSuccess>(ComponenteDigitalActions.REVERT_COMPONENTE_DIGITAL_SUCCESS),
        tap(() => {
            this._componenteDigitalService.revertendo.next(true);
        })
    ), {dispatch: false});
    /**
     * Ações relacionadas a assinatura de minutas com sucesso
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_SUCCESS),
        tap((action) => {
            if (parseInt(this.routerState.params['documentoHandle'], 10) === action.payload) {
                this._store.dispatch(new ComponenteDigitalActions.DownloadComponenteDigital());
            }
        })
    ), {dispatch: false});
    /**
     * Ações relacionadas a assinatura de minutas eletronicamente com sucesso
     */
    assinaDocumentoEletronicamenteSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoEletronicamenteSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
        tap((action) => {
            if (parseInt(this.routerState.params['documentoHandle'], 10) === action.payload) {
                this._store.dispatch(new ComponenteDigitalActions.DownloadComponenteDigital());
            }
        })
    ), {dispatch: false});
    /**
     * Ações relacionadas a remover assinatura de minutas com sucesso
     */
    removeAssinaturaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.RemoveAssinaturaDocumentoSuccess>(AssinaturaActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS),
        tap((action) => {
            if (parseInt(this.routerState.params['documentoHandle'], 10) === action.payload) {
                this._store.dispatch(new ComponenteDigitalActions.DownloadComponenteDigital());
            }
        })
    ), {dispatch: false});
    /**
     * Ações relacionadas a deleção de assinatura pela listagem de assinaturas
     */
    deleteAssinaturaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DeleteAssinaturaDocumentoSuccess>(ComponenteDigitalActions.DELETE_ASSINATURA_DOCUMENTO_SUCCESS),
        tap((action) => {
            if (parseInt(this.routerState.params['documentoHandle'], 10) === action.payload.documentoId) {
                this._store.dispatch(new ComponenteDigitalActions.DownloadComponenteDigital());
            }
        })
    ), {dispatch: false});
    visualizarHtmlComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.VisualizarHTMLComponenteDigital>(ComponenteDigitalActions.VISUALIZAR_HTML_COMPONENTE_DIGITAL),
        switchMap((action) => this._componenteDigitalService.renderHtmlContent(action.payload)),
        tap((response: any) => {
            if (response && response.conteudo) {
                const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob(['\ufeff', byteArray], {type: response.mimetype});
                const URL = window.URL;
                const data = URL.createObjectURL(blob);
                window.open(data, '_blank');
                setTimeout(() => {
                    window.URL.revokeObjectURL(data);
                }, 100);

                this._store.dispatch(new ComponenteDigitalActions.VisualizarHTMLComponenteDigitalSuccess(response));
            }
        }),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.VisualizarHTMLComponenteDigitalFailed(err));
        })
    ), {dispatch: false});

    compararComponenteDigitalComHtml: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.CompararComponenteDigitalComHtml>(ComponenteDigitalActions.COMPARAR_COMPONENTE_DIGITAL_COM_HTML),
        switchMap((action) => this._componenteDigitalService.comparaComponenteDigitalComHtml(this.routerState.params['componenteDigitalHandle'], action.payload)),
        tap((response: any) => {
            if (response && response.conteudo) {
                const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: response.mimetype});
                const URL = window.URL;
                const data = URL.createObjectURL(blob);
                window.open(data, '_blank');

                setTimeout(() => {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data);
                }, 100);

                this._store.dispatch(new ComponenteDigitalActions.CompararComponenteDigitalComHtmlSuccess(response));
            }
        }),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.CompararComponenteDigitalComHtmlFailed(err));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private _cacheGenericUserDataService: CacheGenericUserDataService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.lixeira = !!routerState.state.queryParams.lixeira;
        });
    }
}
