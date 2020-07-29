import {createSelector} from '@ngrx/store';
import {getUnidadeEditAppState, UnidadeEditAppState, UnidadeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getUnidadeEditState = createSelector(
    getUnidadeEditAppState,
    (state: UnidadeEditAppState) => state.unidade
);

export const getUnidadeId = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.loaded ? state.loaded.value : null
);

export const getUnidade = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.loaded
);

export const getErrors = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.errors
);
