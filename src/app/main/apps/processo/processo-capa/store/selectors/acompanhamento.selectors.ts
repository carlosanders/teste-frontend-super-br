import {createSelector} from '@ngrx/store';
import {AcompanhamentoState, getProcessoCapaAppState, ProcessoCapaAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getAcompanhamentoAppState: any = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.acompanhamento
);

export const getAcompanhamentoId: any = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.entitiesId
);

export const getSaveAcompanhamentoId: any = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.entityId
);

export const getAcompanhamento: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcompanhamentoId,
    schemaSelectors.entitiesProjector
);

export const getAcompanhamentoProcessoLoaded: any = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.loaded
);

export const getIsSaving: any = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.saving
);

export const getDeletedIds: any = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.deletedIds
);

export const getIsAcompanhamentoLoading: any = createSelector(
    getAcompanhamentoAppState,
    (state: AcompanhamentoState) => state.loading
);
