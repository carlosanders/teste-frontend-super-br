import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {createSelector} from '@ngrx/store';

import {Lembrete, Processo} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';

import {getLembreteAppState, LembreteAppState, LembreteState} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store/selectors';

const schemaLembreteSelectors = createSchemaSelectors<Lembrete>(lembreteSchema);
const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getLembreteState = createSelector(
    getLembreteAppState,
    (state: LembreteAppState) => state.lembrete
);

export const getLembreteId = createSelector(
    getLembreteState,
    (state: LembreteState) => state.loaded ? state.loaded.value : null
);

export const getLembreteList = createSelector(
    schemaLembreteSelectors.getNormalizedEntities,
    getLembreteId,
    schemaLembreteSelectors.entityProjector
);

export const getProcessos = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaProcessoSelectors.entitiesProjector
);

export const getIsSaving = createSelector(
    getLembreteState,
    (state: LembreteState) => state.saving
);

export const getHasLoaded = createSelector(
    getLembreteState,
    (state: LembreteState) => state.loaded
);

export const getErrors = createSelector(
    getLembreteState,
    (state: LembreteState) => state.errors
);