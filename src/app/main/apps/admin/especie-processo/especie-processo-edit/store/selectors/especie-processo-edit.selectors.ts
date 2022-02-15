import {createSelector} from '@ngrx/store';
import {EspecieProcessoEditAppState, EspecieProcessoEditState, getEspecieProcessoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieProcesso} from '@cdk/models';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';

const schemaEspecieProcessoSelectors = createSchemaSelectors<EspecieProcesso>(especieProcessoSchema);

export const getEspecieProcessoEditState: any = createSelector(
    getEspecieProcessoEditAppState,
    (state: EspecieProcessoEditAppState) => state.especieProcesso
);

export const getEspecieProcessoId: any = createSelector(
    getEspecieProcessoEditState,
    (state: EspecieProcessoEditState) => state.entityId
);

export const getEspecieProcesso: any = createSelector(
    schemaEspecieProcessoSelectors.getNormalizedEntities,
    getEspecieProcessoId,
    schemaEspecieProcessoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getEspecieProcessoEditState,
    (state: EspecieProcessoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getEspecieProcessoEditState,
    (state: EspecieProcessoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getEspecieProcessoEditState,
    (state: EspecieProcessoEditState) => state.errors
);
