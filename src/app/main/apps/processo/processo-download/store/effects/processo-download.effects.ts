import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoDownloadActions from 'app/main/apps/processo/processo-download/store/actions/processo-download.actions';

import {ProcessoService} from '@cdk/services/processo.service';


@Injectable()
export class ProcessoDownloadEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>
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
     * Set downloadAsPdfProcesso
     *
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    downloadAsPdfProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoDownloadActions.DownloadAsPdfProcesso>(ProcessoDownloadActions.DOWNLOAD_AS_PDF_PROCESSO),
                switchMap((action) => {
                    let handle = {
                        id: '',
                        value: ''
                    };
                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        if (this.routerState.params[param]) {
                            handle = {
                                id: param,
                                value: this.routerState.params[param]
                            };
                        }
                    });
                    return this._processoService.downloadAsPdf(handle.value, action.payload);
                }),
                tap((response) => {
                    if (response && response.conteudo) {
                        const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        // tslint:disable-next-line:one-variable-per-declaration
                        const blob = new Blob([byteArray], {type: response.mimetype});
                            const URL = window.URL;
                        const data = URL.createObjectURL(blob);

                        const link = document.createElement('a');
                        link.href = data;
                        link.download = response.fileName;
                        // this is necessary as link.click() does not work on the latest firefox
                        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

                        setTimeout( () => {
                            // For Firefox it is necessary to delay revoking the ObjectURL
                            window.URL.revokeObjectURL(data);
                            link.remove();
                        }, 100);

                    }
                    this._store.dispatch(new ProcessoDownloadActions.DownloadAsPdfProcessoSuccess(response));
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoDownloadActions.DownloadAsPdfProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    downloadAsZipProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoDownloadActions.DownloadAsPdfProcesso>(ProcessoDownloadActions.DOWNLOAD_AS_ZIP_PROCESSO),
                switchMap((action) => {
                    let handle = {
                        id: '',
                        value: ''
                    };
                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        if (this.routerState.params[param]) {
                            handle = {
                                id: param,
                                value: this.routerState.params[param]
                            };
                        }
                    });
                    return this._processoService.downloadAsZip(handle.value, action.payload);
                }),
                tap((response) => {
                    if (response && response.conteudo) {
                        const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        // tslint:disable-next-line:one-variable-per-declaration
                        const blob = new Blob([byteArray], {type: response.mimetype});
                            const URL = window.URL;
                        const data = URL.createObjectURL(blob);

                        const link = document.createElement('a');
                        link.href = data;
                        link.download = response.fileName;
                        // this is necessary as link.click() does not work on the latest firefox
                        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

                        setTimeout( () => {
                            // For Firefox it is necessary to delay revoking the ObjectURL
                            window.URL.revokeObjectURL(data);
                            link.remove();
                        }, 100);
                        this._store.dispatch(new ProcessoDownloadActions.DownloadAsZipProcessoSuccess(response));
                    }
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoDownloadActions.DownloadAsPdfProcessoFailed(err));
                    return caught;
                })
            );
}
