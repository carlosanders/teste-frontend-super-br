import {createSelector} from '@ngrx/store';
import {getVolumeEditAppState, VolumeEditAppState, VolumeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Volume} from '@cdk/models';
import {volume as volumeSchema} from '@cdk/normalizr/volume.schema';

const schemaVolumeSelectors = createSchemaSelectors<Volume>(volumeSchema);

export const getVolumeEditState = createSelector(
    getVolumeEditAppState,
    (state: VolumeEditAppState) => state.volume
);

export const getVolumeId = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.loaded ? state.loaded.value : null
);

export const getVolume = createSelector(
    schemaVolumeSelectors.getNormalizedEntities,
    getVolumeId,
    schemaVolumeSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.loaded
);

export const getErrors = createSelector(
    getVolumeEditState,
    (state: VolumeEditState) => state.errors
);
