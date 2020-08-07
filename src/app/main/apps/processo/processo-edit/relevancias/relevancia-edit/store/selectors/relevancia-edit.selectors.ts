import {createSelector} from '@ngrx/store';
import {getRelevanciaEditAppState, RelevanciaEditAppState, RelevanciaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Relevancia} from '@cdk/models';
import {relevancia as relevanciaSchema} from '@cdk/normalizr';

const schemaRelevanciaSelectors = createSchemaSelectors<Relevancia>(relevanciaSchema);

export const getRelevanciaEditState = createSelector(
    getRelevanciaEditAppState,
    (state: RelevanciaEditAppState) => state.Relevancia
);

export const getRelevanciaId = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.loaded ? state.loaded.value : null
);

export const getRelevancia = createSelector(
    schemaRelevanciaSelectors.getNormalizedEntities,
    getRelevanciaId,
    schemaRelevanciaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.loaded
);

export const getErrors = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.errors
);
