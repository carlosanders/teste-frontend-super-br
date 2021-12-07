import {createSelector} from '@ngrx/store';
import {getTarefasAppState, RootLotacaoListState, TarefasAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';

const schemaSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);

export const getRootLotacaoListState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.lotacaoList
);

export const getLotacaoListIds: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.entitiesId
);

export const getLotacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLotacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationLotacao: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.pagination
);

export const getSetorId: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.setorId
);

export const getLotacaoIsLoading: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loading
);
