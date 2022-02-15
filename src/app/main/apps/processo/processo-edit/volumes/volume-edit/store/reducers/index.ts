import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VolumeEditReducer, VolumeEditState} from './volume-edit.reducer';

export interface VolumeEditAppState
{
    volume: VolumeEditState;
}

export const getVolumeEditAppState = createFeatureSelector<VolumeEditAppState>(
    'volume-edit-app'
);

export const getAppState: any = createSelector(
    getVolumeEditAppState,
    (state: VolumeEditAppState) => state
);

export const reducers: ActionReducerMap<VolumeEditAppState> = {
    volume: VolumeEditReducer
};

export * from './volume-edit.reducer';
