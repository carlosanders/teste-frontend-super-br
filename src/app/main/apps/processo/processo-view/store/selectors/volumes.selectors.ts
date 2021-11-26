import {createSelector} from '@ngrx/store';
import {
    getProcessoViewAppState,
    ProcessoViewAppState,
    VolumesState
} from 'app/main/apps/processo/processo-view/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {volume as volumeSchema} from '@cdk/normalizr';
import {Volume} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Volume>(volumeSchema);

export const getVolumesState: any = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state.volumes
);

export const getVolumesIds: any = createSelector(
    getVolumesState,
    (state: VolumesState) => state.entitiesId
);

export const getVolumes: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVolumesIds,
    schemaSelectors.entitiesProjector
);

export const getVolumesPagination: any = createSelector(
    getVolumesState,
    (state: VolumesState) => state.pagination
);

export const getVolumesLoaded: any = createSelector(
    getVolumesState,
    (state: VolumesState) => state.loaded
);

export const getIsLoadingVolumes: any = createSelector(
    getVolumesState,
    (state: VolumesState) => state.loading
);

export const getSelectedVolume: any = createSelector(
    getVolumesState,
    (state: VolumesState) => state.selectedVolume
);
