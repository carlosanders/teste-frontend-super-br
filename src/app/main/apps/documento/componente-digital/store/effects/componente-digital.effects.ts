import {Injectable, SecurityContext} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componente-digital.actions';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {select, Store} from '@ngrx/store';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ComponenteDigitalEffect {

    routerState: any;
    lixeira = false;

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.lixeira = !!routerState.state.queryParams.lixeira;
                }
            });
    }

    /**
     * Set Current Step
     * @type {Observable<any>}
     */
    @Effect()
    downloadComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.DownloadComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL),
                switchMap(() => {
                    let handle = { id: '', value: '' };
                    let context: any = '{}';
                    const routeParams = of('componenteDigitalHandle');
                    routeParams.subscribe(param => {
                        if (this.routerState.params[param]) {
                            handle = {
                                id: param,
                                value: this.routerState.params[param]
                            };
                        }
                    });
                    const routeChaveAcessoParams = of('chaveAcessoHandle');
                    routeChaveAcessoParams.subscribe(param => {
                        if (this.routerState.params[param]) {
                            context = JSON.stringify({'chaveAcesso': this.routerState.params[param]});
                        }
                    });
                    if (this.lixeira) {
                        context = JSON.stringify({'mostrarApagadas': true});
                    }
                    return this._componenteDigitalService.download(handle.value, context);
                }),
                mergeMap((response: ComponenteDigital) => [
                    new UpdateData<ComponenteDigital>({id: response.id, schema: componenteDigitalSchema, changes: {conteudo: response.conteudo}}),
                    new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                            componenteDigitalId: response.id,
                            loaded: {
                                id: 'componenteDigitalHandle',
                                value: this.routerState.params.componenteDigitalHandle
                            }
                        }
                    ),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
                    return caught;
                })
            );

    /**
     * Visualizar Versão ComponenteDigital
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    visualizarVersaoComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.VisualizarVersaoComponenteDigital>(ComponenteDigitalActions.VISUALIZAR_VERSAO_COMPONENTE_DIGITAL),
                switchMap((action) => {
                    let handle = { id: '', value: '' };
                    const routeParams = of('componenteDigitalHandle');
                    routeParams.subscribe(param => {
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
                        const blob = new Blob(["\ufeff", byteArray], {type: response.mimetype});
                        const URL = window.URL;
                        if (response.mimetype === 'application/pdf' || response.mimetype === 'text/html') {
                            const data = URL.createObjectURL(blob);
                            window.open(data, '_blank');
                            setTimeout( () => {
                                // For Firefox it is necessary to delay revoking the ObjectURL
                                window.URL.revokeObjectURL(data);
                            }, 100);
                        } else {
                            const downloadUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob)),
                                downloadLink = document.createElement('a');
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
                    this._store.dispatch(new ComponenteDigitalActions.VisualizarVersaoComponenteDigitalFailed(err));
                    return caught;
                })
            );

    /**
     * Set Current Step
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    compararVersaoComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.CompararVersaoComponenteDigital>(ComponenteDigitalActions.COMPARAR_VERSAO_COMPONENTE_DIGITAL),
                switchMap((action) => {
                    let handle = { id: '', value: '' };
                    const routeParams = of('componenteDigitalHandle');
                    routeParams.subscribe(param => {
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
                        const blob = new Blob([byteArray], {type: response.mimetype}),
                            URL = window.URL,
                            data = URL.createObjectURL(blob);
                        window.open(data, '_blank');

                        setTimeout( () => {
                            // For Firefox it is necessary to delay revoking the ObjectURL
                            window.URL.revokeObjectURL(data);
                        }, 100);

                    }
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.CompararVersaoComponenteDigitalFailed(err));
                    return caught;
                })
            );

    /**
     * Set Current Step
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    downloadAsPdfComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.DownloadAsPdfComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL),
                switchMap(() => {
                    let handle = {
                        id: '',
                        value: ''
                    };
                    const routeParams = of('componenteDigitalHandle');
                    routeParams.subscribe(param => {
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
                        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

                        setTimeout( () => {
                            // For Firefox it is necessary to delay revoking the ObjectURL
                            window.URL.revokeObjectURL(data);
                            link.remove();
                        }, 100);

                    }
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.DownloadAsPdfComponenteDigitalFailed(err));
                    return caught;
                })
            );

    /**
     * Save ComponenteDigital
     * @type {Observable<any>}
     */
    @Effect()
    saveComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
                switchMap((action) => {
                    return this._componenteDigitalService.patch(action.payload.componenteDigital , {conteudo: action.payload.data, hashAntigo: action.payload.hashAntigo}).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                            new UpdateData<ComponenteDigital>({id: response.id, schema: componenteDigitalSchema, changes: {conteudo: response.conteudo, hash: response.hash}}),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                        })
                    );
                })
            );

    /**
     * Revert ComponenteDigital
     * @type {Observable<any>}
     */
    @Effect()
    revertComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.RevertComponenteDigital>(ComponenteDigitalActions.REVERT_COMPONENTE_DIGITAL),
                switchMap((action) => {
                    return this._componenteDigitalService.reverter(action.payload.componenteDigital , {hash: action.payload.hash}).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.RevertComponenteDigitalSuccess(response),
                            new UpdateData<ComponenteDigital>({id: response.id, schema: componenteDigitalSchema, changes: {conteudo: response.conteudo, hash: response.hash}}),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} revertido com sucesso!`,
                                dateTime: response.atualizadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ComponenteDigitalActions.RevertComponenteDigitalFailed(err));
                        })
                    );
                })
            );

    @Effect({dispatch: false})
    revertComponenteDigitalSuccess: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.RevertComponenteDigitalSuccess>(ComponenteDigitalActions.REVERT_COMPONENTE_DIGITAL_SUCCESS),
                tap((action) => {
                    this._componenteDigitalService.revertendo.next(true);
                })
            )
}
