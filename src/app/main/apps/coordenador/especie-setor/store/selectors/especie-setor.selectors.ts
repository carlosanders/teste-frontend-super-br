import {createSelector} from '@ngrx/store';
import {getEspecieSetorAppState, EspecieSetorAppState, EspecieSetorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieSetor} from '@cdk/models';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr/especie-setor.schema';

const schemaEspecieSetorSelectors = createSchemaSelectors<EspecieSetor>(especieSetorSchema);

export const getEspecieSetorState = createSelector(
    getEspecieSetorAppState,
    (state: EspecieSetorAppState) => state.especieSetor
);

export const getEspecieSetorId = createSelector(
    getEspecieSetorState,
    (state: EspecieSetorState) => (state.loaded && state.loaded.id === 'modeloHandle') ? state.loaded.value : null
);

export const getModelos = createSelector(
    schemaEspecieSetorSelectors.getNormalizedEntities,
    getEspecieSetorId,
    schemaEspecieSetorSelectors.entityProjector
);

export const getHasLoadedEspecieSetor = createSelector(
    getEspecieSetorState,
    (state: EspecieSetorState) => state.loaded.id === 'modeloHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getEspecieSetorState,
    (state: EspecieSetorState) => state.errors
);
