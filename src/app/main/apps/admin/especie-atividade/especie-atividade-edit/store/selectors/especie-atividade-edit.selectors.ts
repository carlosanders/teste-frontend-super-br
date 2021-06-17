import {createSelector} from '@ngrx/store';
import {EspecieAtividadeEditAppState, EspecieAtividadeEditState, getEspecieAtividadeEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieAtividade} from '@cdk/models';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr';

const schemaEspecieAtividadeSelectors = createSchemaSelectors<EspecieAtividade>(especieAtividadeSchema);

export const getEspecieAtividadeEditState = createSelector(
    getEspecieAtividadeEditAppState,
    (state: EspecieAtividadeEditAppState) => state.especieAtividade
);

export const getEspecieAtividadeId = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.entityId
);

export const getEspecieAtividade = createSelector(
    schemaEspecieAtividadeSelectors.getNormalizedEntities,
    getEspecieAtividadeId,
    schemaEspecieAtividadeSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.loaded
);

export const getErrors = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.errors
);
