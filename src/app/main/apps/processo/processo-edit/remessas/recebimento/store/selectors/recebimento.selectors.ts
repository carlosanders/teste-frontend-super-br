import {createSelector} from '@ngrx/store';
import {getRecebimentoAppState, RecebimentoAppState, RecebimentoTramitacaoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';

const schemaTramitacaoSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getRecebimentoTramitacaoState = createSelector(
    getRecebimentoAppState,
    (state: RecebimentoAppState) => state.recebimento
);

export const getIsSaving = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.saving
);

export const getErrors = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.errors
);

export const getTramitacaoId = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.loaded ? state.loaded.value : null
);

export const getTramitacao = createSelector(
    schemaTramitacaoSelectors.getNormalizedEntities,
    getTramitacaoId,
    schemaTramitacaoSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.loaded
);
