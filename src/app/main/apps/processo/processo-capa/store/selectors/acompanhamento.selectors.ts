import {createSelector} from '@ngrx/store';
import {AcompanhamentoState, getProcessoCapaAppState, ProcessoCapaAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getAcompanhamentoAppState = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.acompanhamento
);

export const getAcompanhamentoId = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.entitiesId
);

export const getSaveAcompanhamentoId = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.entityId
);

export const getAcompanhamento = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcompanhamentoId,
    schemaSelectors.entitiesProjector
);

export const getAcompanhamentoProcessoLoaded = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.loaded
);

export const getIsSaving = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.saving
);

export const getDeletedIds = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.deletedIds
);

export const getIsAcompanhamentoLoading = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.loading
);
