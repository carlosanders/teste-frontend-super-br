import {createSelector} from '@ngrx/store';
import {getTramitacaoEditAppState, TramitacaoEditAppState, TramitacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';

const schemaTramitacaoSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getTramitacaoEditState = createSelector(
    getTramitacaoEditAppState,
    (state: TramitacaoEditAppState) => state.tramitacao
);

export const getTramitacaoId = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getTramitacao = createSelector(
    schemaTramitacaoSelectors.getNormalizedEntities,
    getTramitacaoId,
    schemaTramitacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.errors
);
