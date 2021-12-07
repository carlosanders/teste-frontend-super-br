import {createSelector} from '@ngrx/store';
import {getRecebimentoAppState, RecebimentoAppState, RecebimentoTramitacaoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';

const schemaTramitacaoSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getRecebimentoTramitacaoState: any = createSelector(
    getRecebimentoAppState,
    (state: RecebimentoAppState) => state.recebimento
);

export const getIsSaving: any = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.saving
);

export const getErrors: any = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.errors
);

export const getTramitacaoId: any = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.loaded ? state.loaded.value : null
);

export const getTramitacao: any = createSelector(
    schemaTramitacaoSelectors.getNormalizedEntities,
    getTramitacaoId,
    schemaTramitacaoSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getRecebimentoTramitacaoState,
    (state: RecebimentoTramitacaoState) => state.loaded
);
