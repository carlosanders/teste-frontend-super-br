import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VolumeListActions from '../actions';

import {VolumeService} from '@cdk/services/volume.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Volume} from '@cdk/models';
import {volume as volumeSchema} from '@cdk/normalizr';
import {CdkUtils} from "../../../../../../../../../@cdk/utils";

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
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Volumes with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getVolumes: any =
        this._actions
            .pipe(
                ofType<VolumeListActions.GetVolumes>(VolumeListActions.GET_VOLUMES),
                switchMap((action) => {
                    return this._volumeService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context));
                }),
                mergeMap((response) => [
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
     * @type {Observable<any>}
     */
    @Effect()
    deleteVolume: any =
        this._actions
            .pipe(
                ofType<VolumeListActions.DeleteVolume>(VolumeListActions.DELETE_VOLUME),
                mergeMap((action) => {
                    return this._volumeService.destroy(action.payload).pipe(
                        map((response) => new VolumeListActions.DeleteVolumeSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new VolumeListActions.DeleteVolumeFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}
