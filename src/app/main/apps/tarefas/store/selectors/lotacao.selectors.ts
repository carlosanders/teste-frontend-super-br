import {createSelector} from '@ngrx/store';
import {getTarefasAppState, RootLotacaoListState, TarefasAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';

const schemaSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);

export const getRootLotacaoListState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.lotacaoList
);

export const getLotacaoListIds = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.entitiesId
);

export const getLotacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLotacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationLotacao = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.pagination
);

export const getSetorId = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.setorId
);

export const getLotacaoIsLoading = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loading
);
