import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VolumeListActions from '../actions';

import {VolumeService} from '@cdk/services/volume.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Volume} from '@cdk/models';
import {volume as volumeSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VolumeListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _volumeService: VolumeService,
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
     * Get Volumes with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVolumes: any =
        this._actions
            .pipe(
                ofType<VolumeListActions.GetVolumes>(VolumeListActions.GET_VOLUMES),
                switchMap(action => this._volumeService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context))),
                mergeMap(response => [
                    new AddData<Volume>({data: response['entities'], schema: volumeSchema}),
                    new VolumeListActions.GetVolumesSuccess({
                        entitiesId: response['entities'].map(volume => volume.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new VolumeListActions.GetVolumesFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Volume
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVolume: Observable<VolumeListActions.VolumeListActionsAll> =
        this._actions
            .pipe(
                ofType<VolumeListActions.DeleteVolume>(VolumeListActions.DELETE_VOLUME),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'volume',
                        content: 'Apagando a volume id ' + action.payload.volumeId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._volumeService.destroy(action.payload.volumeId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'volume',
                                content: 'Volume id ' + action.payload.volumeId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Volume>({
                                id: response.id,
                                schema: volumeSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new VolumeListActions.DeleteVolumeSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.volumeId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'volume',
                                content: 'Erro ao apagar a volume id ' + action.payload.volumeId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new VolumeListActions.DeleteVolumeFailed(payload));
                        })
                    );
                }, 25)
            );
}
