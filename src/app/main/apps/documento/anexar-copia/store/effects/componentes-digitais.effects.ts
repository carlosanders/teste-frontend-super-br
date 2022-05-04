import {Injectable, SecurityContext} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ComponentesDigitaisEffects {
    routerState: any;
    /**
     * Visualizar Juntada em outra aba
     *
     * @type {Observable<any>}
     */
    visualizarJuntada: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.VisualizarJuntada>(ComponenteDigitalActions.VISUALIZAR_JUNTADA),
        switchMap((action) => {
            const handle = {
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
            return of(new ComponenteDigitalActions.VisualizarJuntadaFailed(err));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>,
        private _router: Router,
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
