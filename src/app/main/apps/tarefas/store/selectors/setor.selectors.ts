import {createSelector} from '@ngrx/store';
import {getTarefasAppState, TarefasAppState, RootSetorState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRootSetorState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.setores
);

export const getSetoresIds = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.entitiesId
);

export const getSetores = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSetoresIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationSetores = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.pagination
);

export const getUnidadeId = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.unidadeId
);

export const getUnidadeIsLoading = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.loading
);
