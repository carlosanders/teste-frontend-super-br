import {Injectable, SecurityContext} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
            return this._componenteDigitalService.download(handle.value, context);
        }),
        mergeMap((response: ComponenteDigital) => [
            new UpdateData<ComponenteDigital>({
                id: response.id,
                schema: componenteDigitalSchema,
                changes: {conteudo: response.conteudo}
            }),
            new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                    componenteDigitalId: response.id,
                    loaded: {
                        id: 'componenteDigitalHandle',
                        value: this.routerState.params.componenteDigitalHandle
                    }
                }
            ),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
        })
    ));
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
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'componente digital',
                content: `Componente Digital id ${response.id} salvo com sucesso!`,
                status: 1, // sucesso
            }))),
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
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
                    content: 'Erro ao salvar o componente digital!',
                    status: 2, // erro
                }));
                return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
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

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
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
