import {createSelector} from '@ngrx/store';
import {getTarefasAppState, RootUnidadeState, TarefasAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {unidade as unidadeSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(unidadeSchema);

export const getRootUnidadeState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.unidades
);

export const getUnidadesIds: any = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.entitiesId
);

export const getUnidades: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUnidadesIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationUnidades: any = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.pagination
);

export const getOrgaoCentralId: any = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.orgaoCentralId
);

export const getOrgaoCentralIsLoading: any = createSelector(
    getRootUnidadeState,
    (state: RootUnidadeState) => state.loading
);
