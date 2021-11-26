import {createSelector} from '@ngrx/store';
import {getRelevanciaEditAppState, RelevanciaEditAppState, RelevanciaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Relevancia} from '@cdk/models';
import {relevancia as relevanciaSchema} from '@cdk/normalizr';

const schemaRelevanciaSelectors = createSchemaSelectors<Relevancia>(relevanciaSchema);

export const getRelevanciaEditState: any = createSelector(
    getRelevanciaEditAppState,
    (state: RelevanciaEditAppState) => state.Relevancia
);

export const getRelevanciaId: any = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.loaded ? state.loaded.value : null
);

export const getRelevancia: any = createSelector(
    schemaRelevanciaSelectors.getNormalizedEntities,
    getRelevanciaId,
    schemaRelevanciaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRelevanciaEditState,
    (state: RelevanciaEditState) => state.errors
);
