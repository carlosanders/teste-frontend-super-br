import {createSelector} from '@ngrx/store';
import {getTarefasAppState, RootUnidadeState, TarefasAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {unidade as unidadeSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(unidadeSchema);

export const getRootUnidadeState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.unidades
);

export const getUnidadesIds = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.entitiesId
);

export const getUnidades = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUnidadesIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationUnidades = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.pagination
);

export const getOrgaoCentralId = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.orgaoCentralId
);

export const getOrgaoCentralIsLoading = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.loading
);
