import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componente-digital.actions';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {select, Store} from '@ngrx/store';
import {AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ComponenteDigitalEffect {
    routerState: any;
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
            return this._componenteDigitalService.download(handle.value, context);
        }),
        mergeMap(response => [
            new AddData<ComponenteDigital>({
                data: [response],
                schema: componenteDigitalSchema
            }),
            new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                componenteDigitalId: response.id,
                componenteDigital: response,
                loaded: {
                    id: response.id,
                    chaveAcesso: this.routerState.params['chaveAcessoHandle']
                }
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router,
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
