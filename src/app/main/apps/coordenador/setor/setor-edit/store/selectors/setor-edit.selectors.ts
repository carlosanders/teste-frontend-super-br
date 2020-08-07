import {createSelector} from '@ngrx/store';
import {getSetorEditAppState, SetorEditAppState, SetorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';
import {getCoordenadorAppState, CoordenadorAppState, CoordenadorState} from '../../../../store/reducers';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getSetorEditState = createSelector(
    getSetorEditAppState,
    (state: SetorEditAppState) => state.setor
);

export const getCoordenadorState = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getSetorId = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.loaded ? state.loaded.value : null
);

export const getUnidadeId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded ? state.loaded.value : null
);

export const getUnidade = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
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

export const getHasLoadedUnidade = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);

export const getErrors = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.errors
);
