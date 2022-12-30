import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaActions from 'app/store/actions/assinatura.actions';
import * as ProcessoViewActions from '../actions/processo-view.actions';
import * as fromStore from '../index';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import {Assinatura} from '@cdk/models';
import {of} from 'rxjs';
import {AddData} from '@cdk/ngrx-normalizr';

@Injectable()
export class AssinaturasEffects {
    routerState: any;
    /**
     * Ações relacionadas a assinatura de minutas com sucesso
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new ProcessoViewActions.LimpaCacheDocumento(action.payload));
            this._store.dispatch(new fromStore.UnloadSelectedJuntadasId());
            this._store.dispatch(new fromStore.SetActiveCard('juntadas'));
        })
    ), {dispatch: false});
    /**
     * Ações referentes a sucesso na assinatura eletrônica de componente digital
     */
    assinaDocumentoEletronicamenteSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoEletronicamenteSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
        tap((action) => {
            this._store.dispatch(new ProcessoViewActions.LimpaCacheDocumento(action.payload));
            this._store.dispatch(new fromStore.UnloadSelectedJuntadasId());
            this._store.dispatch(new fromStore.SetActiveCard('juntadas'));
        })
    ), {dispatch: false});

    getAssinaturas: any = createEffect(() => this._actions.pipe(
            ofType<fromStore.GetAssinaturas>(fromStore.GET_ASSINATURAS),
            switchMap(action => this._assinaturaService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate))),
            mergeMap(response => [
                new AddData<Assinatura>({data: response['entities'], schema: assinaturaSchema}),
                new fromStore.GetAssinaturasSuccess({
                    entitiesId: response['entities'].map(assinatura => assinatura.id),
                    loaded: {
                        id: 'componenteDigitalHandle',
                        value: this.routerState.params['componenteDigitalHandle']
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new fromStore.GetAssinaturasFailed(err));
            })
        ));

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _assinaturaService: AssinaturaService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
