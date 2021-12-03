import {createSelector} from '@ngrx/store';
import {
    ComponentesDigitaisAppState,
    ComponentesDigitaisState,
    getComponentesDigitaisAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {
    componenteDigital as componenteDigitalSchema,
    processo as schemaProcesso,
    tarefa as schemaTarefa
} from '@cdk/normalizr';
import {ComponenteDigital, Modelo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);
const schemaProcessoSelectors = createSchemaSelectors<Modelo>(schemaProcesso);
const schemaTarefaSelectors = createSchemaSelectors<Modelo>(schemaTarefa);

export const getComponentesDigitaisState: any = createSelector(
    getComponentesDigitaisAppState,
    (state: ComponentesDigitaisAppState) => state.componentesDigitais
);

export const getComponentesDigitaisIds: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.entitiesId
);

export const getComponentesDigitais: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getComponentesDigitaisIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.pagination
);

export const getIsLoading: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.loading
);

export const getIsSaving: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.saving
);

export const getErrors: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.errors
);

export const getIsLoadingSaving: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.loading
);

export const getProcessoId: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.loaded && (state.loaded.id === 'processoHandle') ? state.loaded.value : null
);

export const getTarefaId: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.loaded && (state.loaded.id === 'tarefaHandle') ? state.loaded.value : null
);

export const getProcesso: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getTarefa: any = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);
