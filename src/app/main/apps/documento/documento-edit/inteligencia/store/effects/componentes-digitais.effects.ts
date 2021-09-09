import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {ComponenteDigital} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';

@Injectable()
export class ComponenteDigitalEffects {
    routerState: any;
    componenteDigitalId: number;
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    getComponentesDigitais: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetComponentesDigitais>(ComponenteDigitalActions.GET_COMPONENTES_DIGITAIS),
        switchMap((action) => {

            const params = {
                filter: action.payload.filter ? action.payload.filter : {
                    'documento.id': 'eq:' + action.payload
                },
                limit: action.payload.limit ? action.payload.limit : 5,
                offset: action.payload.offset ? action.payload.offset : 0,
                sort: action.payload.sort ? action.payload.sort : {numeracaoSequencial: 'ASC'},
                populate: []
            };

            return this._componenteDigitalService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate));
        }),
        mergeMap(response => [
            // new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
            new ComponenteDigitalActions.GetComponentesDigitaisSuccess({
                entitiesId: response['entities'].map(componenteDigital => componenteDigital.id),
                loaded: {
                    id: 'componenteDigitalHandle',
                    value: this.routerState.params.componenteDigitalHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.GetComponentesDigitaisFailed(err));
        })
    ));
    /**
     * Set Current Step
     *
     * @type {Observable<any>}
     */
    downloadComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.DownloadComponenteDigital>(ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL),
        switchMap(action => this._componenteDigitalService.download(action.payload.componenteDigitalId).pipe(
            mergeMap((response: ComponenteDigital) => [
                new UpdateData<ComponenteDigital>({
                    id: response.id,
                    schema: componenteDigitalSchema,
                    changes: {conteudo: response.conteudo}
                }),
                new ComponenteDigitalActions.DownloadComponenteDigitalSuccess({
                        componenteDigitalId: response.id,
                        repositorioId: action.payload.repositorioId
                    }
                ),
            ]),
        )),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.DownloadComponenteDigitalFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
