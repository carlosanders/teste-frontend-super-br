import {createSelector} from '@ngrx/store';
import {getTarefasAppState, TarefasAppState, RootLotacaoListState} from '../reducers';

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

/*export const getPagination = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.pagination
);
*/
export const getLotacaoListLoaded = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loaded
);

export const getIsLoadingLotacao = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loading
);

