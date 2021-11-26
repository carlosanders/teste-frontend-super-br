import {createSelector} from '@ngrx/store';
import {getUnidadeEditAppState, UnidadeEditAppState, UnidadeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getUnidadeEditState: any = createSelector(
    getUnidadeEditAppState,
    (state: UnidadeEditAppState) => state.unidade
);

export const getUnidadeId: any = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.loaded ? state.loaded.value : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getUnidadeEditState,
    (state: UnidadeEditState) => state.errors
);
