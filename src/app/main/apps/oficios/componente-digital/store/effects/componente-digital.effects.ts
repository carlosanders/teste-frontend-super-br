import {Injectable} from '@angular/core';
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

@Injectable()
export class ComponenteDigitalEffect {

    routerState: any;
    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    downloadComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DownloadComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL),
        switchMap(() => {
            let handle = {id: '', value: ''};
            let context = '{}';
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
                    context = JSON.stringify({chaveAcesso: this.routerState.params[param]});
                }
            });
            return this._componenteDigitalService.download(handle.value, context);
        }),
        mergeMap((response: ComponenteDigital) => [
            new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                    componenteDigitalId: response.id,
                    loaded: {
                        id: 'componenteDigitalHandle',
                        value: response.id
                    }
                }
            ),
            new UpdateData<ComponenteDigital>({
                id: response.id,
                schema: componenteDigitalSchema,
                changes: {conteudo: response.conteudo}
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
        })
    ));
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

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}
