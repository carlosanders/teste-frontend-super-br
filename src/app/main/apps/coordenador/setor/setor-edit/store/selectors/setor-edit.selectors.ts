import {createSelector} from '@ngrx/store';
import {getSetorEditAppState, SetorEditAppState, SetorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';
import {CoordenadorSetorAppState, CoordenadorSetorState, getCoordenadorSetorAppState} from '../../../store';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getSetorEditState: any = createSelector(
    getSetorEditAppState,
    (state: SetorEditAppState) => state.setor
);

export const getCoordenadorSetorState: any = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
);

export const getSetorId: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.loaded ? state.loaded.value : null
);

export const getUnidadeId: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loadedUnidade ? state.unidadeId : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.loaded
);

export const getHasLoadedUnidade: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loadedUnidade
);

export const getErrors: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.errors
);
