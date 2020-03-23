import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lembrete} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import {createSelector} from '@ngrx/store';
import {getLembreteBlocoAppState, LembreteBlocoAppState, LembreteBlocoState} from '../reducers';

const schemaLembreteBlocoSelectors = createSchemaSelectors<Lembrete>(lembreteSchema);

export const getLembreteBlocoState = createSelector(
    getLembreteBlocoAppState,
    (state: LembreteBlocoAppState) => state.lembrete
);

export const getLembreteBlocoId = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.loaded ? state.loaded.value : null
);

export const getLembreteBlocoList = createSelector(
    schemaLembreteBlocoSelectors.getNormalizedEntities,
    getLembreteBlocoId,
    schemaLembreteBlocoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.saving
);

export const getHasLoaded = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.loaded
);

export const getErrors = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.errors
);