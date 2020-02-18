import { createSelector } from '@ngrx/store';
import { getProcessosAppState, ProcessosAppState, ProcessosState } from 'app/main/apps/oficios/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { processo as processoSchema } from '@cdk/normalizr/processo.schema';
import {Processo} from '../../../../../../@cdk/models/processo.model';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessosState = createSelector(
    getProcessosAppState,
    (state: ProcessosAppState) => state.processos
);

export const getSelectedProcessoIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.selectedProcessoIds
);

export const getMaximizado = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.maximizado
);

export const getProcessosIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.entitiesId
);

export const getProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

// export const getSelectedTarefas = createSelector(
//     schemaSelectors.getNormalizedEntities,
//     getSelectedTarefaIds,
//     schemaSelectors.entitiesProjector
// );
//
// export const getPagination = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.pagination
// );
//
export const getProcessosLoaded = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loaded
);
//
// export const getIsLoading = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.loading
// );
//
// export const getDeletingTarefaIds = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.deletingTarefaIds
// );
//
// export const getDeletedTarefaIds = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.deletedTarefaIds
// );
