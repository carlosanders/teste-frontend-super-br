import {createSelector} from '@ngrx/store';
import {getTramitacaoEditAppState, TramitacaoEditAppState, TramitacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';

const schemaTramitacaoSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getTramitacaoEditState: any = createSelector(
    getTramitacaoEditAppState,
    (state: TramitacaoEditAppState) => state.tramitacao
);

export const getTramitacaoId: any = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getTramitacao: any = createSelector(
    schemaTramitacaoSelectors.getNormalizedEntities,
    getTramitacaoId,
    schemaTramitacaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTramitacaoEditState,
    (state: TramitacaoEditState) => state.errors
);
