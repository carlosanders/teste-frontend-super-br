import { createSelector } from '@ngrx/store';
import { getStatusBarramentoAppState, StatusBarramentoAppState, StatusBarramentoState } from '../reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { statusBarramento as statusBarramentoSchema } from '@cdk/normalizr';
import {StatusBarramento} from "@cdk/models/status-barramento";

const schemaStatusBarramentoSelectors = createSchemaSelectors<StatusBarramento>(statusBarramentoSchema);

export const getStatusBarramentoState = createSelector(
    getStatusBarramentoAppState,
    (state: StatusBarramentoAppState) => state.statusBarramento
);

export const getStatusBarramentoId = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.statusBarramentoId
);

export const getStatusBarramento = createSelector(
    schemaStatusBarramentoSelectors.getNormalizedEntities,
    getStatusBarramentoId,
    schemaStatusBarramentoSelectors.entityProjector
);

export const getErrors = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.errors
);

export const getHasLoaded = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.loaded
);

export const getIsLoading = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.loading
);
