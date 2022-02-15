import { createSelector } from '@ngrx/store';
import { getStatusBarramentoAppState, StatusBarramentoAppState, StatusBarramentoState } from '../reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { statusBarramento as statusBarramentoSchema } from '../../../../../../../../../@cdk/normalizr';
import {StatusBarramento} from "../../../../../../../../../@cdk/models/status-barramento";

const schemaStatusBarramentoSelectors = createSchemaSelectors<StatusBarramento>(statusBarramentoSchema);

export const getStatusBarramentoState: any = createSelector(
    getStatusBarramentoAppState,
    (state: StatusBarramentoAppState) => state.statusBarramento
);

export const getStatusBarramentoId: any = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.statusBarramentoId
);

export const getStatusBarramento: any = createSelector(
    schemaStatusBarramentoSelectors.getNormalizedEntities,
    getStatusBarramentoId,
    schemaStatusBarramentoSelectors.entityProjector
);

export const getErrors: any = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.errors
);

export const getHasLoaded: any = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getStatusBarramentoState,
    (state: StatusBarramentoState) => state.loading
);
