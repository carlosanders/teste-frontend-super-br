import {createSelector} from '@ngrx/store';
import {getVolumeEditAppState, VolumeEditAppState, VolumeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Volume} from '@cdk/models';
import {volume as volumeSchema} from '@cdk/normalizr';

const schemaVolumeSelectors = createSchemaSelectors<Volume>(volumeSchema);

export const getVolumeEditState: any = createSelector(
    getVolumeEditAppState,
    (state: VolumeEditAppState) => state.volume
);

export const getVolumeId: any = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.loaded ? state.loaded.value : null
);

export const getVolume: any = createSelector(
    schemaVolumeSelectors.getNormalizedEntities,
    getVolumeId,
    schemaVolumeSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.errors
);
