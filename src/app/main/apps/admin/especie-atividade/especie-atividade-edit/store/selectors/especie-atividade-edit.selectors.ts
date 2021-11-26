import {createSelector} from '@ngrx/store';
import {EspecieAtividadeEditAppState, EspecieAtividadeEditState, getEspecieAtividadeEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieAtividade} from '@cdk/models';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr';

const schemaEspecieAtividadeSelectors = createSchemaSelectors<EspecieAtividade>(especieAtividadeSchema);

export const getEspecieAtividadeEditState: any = createSelector(
    getEspecieAtividadeEditAppState,
    (state: EspecieAtividadeEditAppState) => state.especieAtividade
);

export const getEspecieAtividadeId: any = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.entityId
);

export const getEspecieAtividade: any = createSelector(
    schemaEspecieAtividadeSelectors.getNormalizedEntities,
    getEspecieAtividadeId,
    schemaEspecieAtividadeSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getEspecieAtividadeEditState,
    (state: EspecieAtividadeEditState) => state.errors
);
