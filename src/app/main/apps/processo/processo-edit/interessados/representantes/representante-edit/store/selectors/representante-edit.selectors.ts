import {createSelector} from '@ngrx/store';
import {
    getRepresentanteEditAppState,
    RepresentanteEditAppState,
    RepresentanteEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Representante} from '@cdk/models';
import {representante as representanteSchema} from '@cdk/normalizr';

const schemaRepresentanteSelectors = createSchemaSelectors<Representante>(representanteSchema);

export const getRepresentanteEditState: any = createSelector(
    getRepresentanteEditAppState,
    (state: RepresentanteEditAppState) => state.representante
);

export const getRepresentanteId: any = createSelector(
    getRepresentanteEditState,
    (state: RepresentanteEditState) => state.loaded ? state.loaded.value : null
);

export const getRepresentante: any = createSelector(
    schemaRepresentanteSelectors.getNormalizedEntities,
    getRepresentanteId,
    schemaRepresentanteSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRepresentanteEditState,
    (state: RepresentanteEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRepresentanteEditState,
    (state: RepresentanteEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRepresentanteEditState,
    (state: RepresentanteEditState) => state.errors
);
