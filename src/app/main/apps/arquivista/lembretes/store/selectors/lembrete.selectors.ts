import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lembrete} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import {createSelector} from '@ngrx/store';
import {getLembreteAppState, LembreteAppState, LembreteState} from '../reducers';

const schemaLembreteSelectors = createSchemaSelectors<Lembrete>(lembreteSchema);

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