import {createSelector} from '@ngrx/store';
import {getAfastamentoEditAppState, AfastamentoEditAppState, AfastamentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Afastamento} from '@cdk/models';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';

const schemaAfastamentoSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);

export const getAfastamentoEditState = createSelector(
    getAfastamentoEditAppState,
    (state: AfastamentoEditAppState) => state.afastamento
);

export const getAfastamentoId = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getAfastamento = createSelector(
    schemaAfastamentoSelectors.getNormalizedEntities,
    getAfastamentoId,
    schemaAfastamentoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded
);

export const getErrors = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.errors
);
