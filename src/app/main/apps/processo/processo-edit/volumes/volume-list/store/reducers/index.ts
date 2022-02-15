import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VolumeListReducer, VolumeListState} from './volume-list.reducer';

export interface VolumeListAppState
{
    volumeList: VolumeListState;
}

export const getVolumeListAppState = createFeatureSelector<VolumeListAppState>(
    'volume-list-app'
);

export const getAppState: any = createSelector(
    getVolumeListAppState,
    (state: VolumeListAppState) => state
);

export const reducers: ActionReducerMap<VolumeListAppState> = {
    volumeList: VolumeListReducer
};

export * from './volume-list.reducer';
