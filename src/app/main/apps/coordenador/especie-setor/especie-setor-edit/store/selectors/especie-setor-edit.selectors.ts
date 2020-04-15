import {createSelector} from '@ngrx/store';
import {getEspecieSetorEditAppState, EspecieSetorEditAppState, EspecieSetorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieSetor} from '@cdk/models/especie-setor.model';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr/especie-setor.schema';
import {getEspecieSetorState} from '../../../store/selectors';
import {EspecieSetorState} from '../../../store/reducers';
import {Modelo} from '@cdk/models';
import {modelo as schemaModelo} from '@cdk/normalizr/modelo.schema';

const schemaEspecieSetorSelectors = createSchemaSelectors<EspecieSetor>(especieSetorSchema);
const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);

export const getEspecieSetorEditState = createSelector(
    getEspecieSetorEditAppState,
    (state: EspecieSetorEditAppState) => state.especieSetor
);

export const getEspecieSetorId = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.loaded ? state.loaded.value : null
);

export const getEspecieSetor = createSelector(
    schemaEspecieSetorSelectors.getNormalizedEntities,
    getEspecieSetorId,
    schemaEspecieSetorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.loaded
);

export const getErrors = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.errors
);

export const getModeloId = createSelector(
    getEspecieSetorState,
    (state: EspecieSetorState) => (state.loaded && state.loaded.id === 'modeloHandle') ? state.loaded.value : null
);

export const getModelo = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);