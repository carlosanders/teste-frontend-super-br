import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as VolumeEditActions from '../actions/volume-edit.actions';
import * as VolumeListActions from '../../../volume-list/store/actions/volume-list.actions';

import {VolumeService} from '@cdk/services/volume.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {volume as volumeSchema} from '@cdk/normalizr';
import {Volume} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VolumeEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _volumeService: VolumeService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Volume with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVolume: any =
        this._actions
            .pipe(
                ofType<VolumeEditActions.GetVolume>(VolumeEditActions.GET_VOLUME),
                switchMap(action => this._volumeService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Volume>({data: response['entities'], schema: volumeSchema}),
                    new VolumeEditActions.GetVolumeSuccess({
                        loaded: {
                            id: 'volumeHandle',
                            value: this.routerState.params.volumeHandle
                        },
                        volumeId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VolumeEditActions.GetVolumeFailed(err));
                    return caught;
                })
            );

    /**
     * Save Volume
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveVolume: any =
        this._actions
            .pipe(
                ofType<VolumeEditActions.SaveVolume>(VolumeEditActions.SAVE_VOLUME),
                switchMap(action => this._volumeService.save(action.payload).pipe(
                        mergeMap((response: Volume) => [
                            new VolumeEditActions.SaveVolumeSuccess(),
                            new VolumeListActions.ReloadVolumes(),
                            new AddData<Volume>({data: [response], schema: volumeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'volume',
                                content: `Volume id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new VolumeEditActions.SaveVolumeFailed(err));
                        })
                    ))
            );
    /**
     * Save Volume Success
     */
    @Effect({dispatch: false})
    saveVolumeSuccess: any =
        this._actions
            .pipe(
                ofType<VolumeEditActions.SaveVolumeSuccess>(VolumeEditActions.SAVE_VOLUME_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.volumeHandle), 'listar')]).then();
                })
            );
}
