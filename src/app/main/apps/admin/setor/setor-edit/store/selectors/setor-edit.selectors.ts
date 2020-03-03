import {createSelector} from '@ngrx/store';
import {getSetorEditAppState, SetorEditAppState, SetorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getSetorEditState = createSelector(
    getSetorEditAppState,
    (state: SetorEditAppState) => state.setor
);

export const getSetorId = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.loaded ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.loaded
);

export const getErrors = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.errors
);
