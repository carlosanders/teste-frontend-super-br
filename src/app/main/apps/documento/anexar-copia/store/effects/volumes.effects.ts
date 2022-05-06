import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VolumesActions from '../actions/volumes.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Volume} from '@cdk/models';
import {volume as volumeSchema} from '@cdk/normalizr';
import {VolumeService} from '@cdk/services/volume.service';
import {Router} from '@angular/router';

@Injectable()
export class VolumesEffects {
    routerState: any;
    /**
     * Get Volumes with router parameters
     *
     * @type {Observable<any>}
     */
    getVolumes: any = createEffect(() => this._actions.pipe(
        ofType<VolumesActions.GetVolumes>(VolumesActions.GET_VOLUMES),
        switchMap(action => this._volumeService.query(
            JSON.stringify({
                ...action.payload.filter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<Volume>({data: response['entities'], schema: volumeSchema}),
            new VolumesActions.GetVolumesSuccess({
                entitiesId: response['entities'].map(volume => volume.id),
                loaded: {
                    id: 'processoCopiaHandle',
                    value: this.routerState.params.processoCopiaHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VolumesActions.GetVolumesFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _volumeService: VolumeService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
