import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componente-digital.actions';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {select, Store} from '@ngrx/store';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';
import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ComponenteDigitalEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
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
                    return this._componenteDigitalService.download(handle.value);
                }),
                mergeMap((response: ComponenteDigital) => [
                    new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                            componenteDigitalId: response.id,
                            loaded: {
                                id: 'componenteDigitalHandle',
                                value: this.routerState.params.componenteDigitalHandle
                            }
                        }
                    ),
                    new UpdateData<ComponenteDigital>({id: response.id, schema: componenteDigitalSchema, changes: {conteudo: response.conteudo}})
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
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
                    return this._componenteDigitalService.patch(action.payload.componenteDigital , {conteudo: action.payload.data}).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                            new UpdateData<ComponenteDigital>({id: response.id, schema: componenteDigitalSchema, changes: {conteudo: response.conteudo}}),
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

}
