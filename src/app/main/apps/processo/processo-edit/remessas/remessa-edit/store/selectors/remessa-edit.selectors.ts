import {createSelector} from '@ngrx/store';
import {getRemessaEditAppState, RemessaEditAppState, RemessaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';

const schemaTramitacaoSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getRemessaEditState: any = createSelector(
    getRemessaEditAppState,
    (state: RemessaEditAppState) => state.tramitacao
);

export const getTramitacaoId: any = createSelector(
    getRemessaEditState,
    (state: RemessaEditState) => state.loaded ? state.loaded.value : null
);

export const getTramitacao: any = createSelector(
    schemaTramitacaoSelectors.getNormalizedEntities,
    getTramitacaoId,
    schemaTramitacaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRemessaEditState,
    (state: RemessaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRemessaEditState,
    (state: RemessaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRemessaEditState,
    (state: RemessaEditState) => state.errors
);
