import {createSelector} from '@ngrx/store';
import {getTarefasAppState, RootSetorState, TarefasAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRootSetorState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.setores
);

export const getSetoresIds: any = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.entitiesId
);

export const getSetores: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSetoresIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationSetores: any = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.pagination
);

export const getUnidadeId: any = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.unidadeId
);

export const getUnidadeIsLoading: any = createSelector(
    getRootSetorState,
    (state: RootSetorState) => state.loading
);
