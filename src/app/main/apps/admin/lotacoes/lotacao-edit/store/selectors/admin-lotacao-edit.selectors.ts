import {createSelector} from '@ngrx/store';
import {getLotacaoEditAppState, LotacaoEditAppState, LotacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema} from '@cdk/normalizr/lotacao.schema';

const schemaLotacaoSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);

export const getLotacaoEditState = createSelector(
    getLotacaoEditAppState,
    (state: LotacaoEditAppState) => state.lotacao
);

export const getLotacaoId = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getLotacao = createSelector(
    schemaLotacaoSelectors.getNormalizedEntities,
    getLotacaoId,
    schemaLotacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.errors
);
