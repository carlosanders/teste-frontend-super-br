import {createSelector} from '@ngrx/store';
import {
    getCompetenciasListAppState,
    CompetenciasListAppState,
    CompetenciasListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr/vinculacao-setor-municipio.schema';
import {VinculacaoSetorMunicipio} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoSetorMunicipio>(vinculacaoSetorMunicipioSchema);

export const getCompetenciasListState = createSelector(
    getCompetenciasListAppState,
    (state: CompetenciasListAppState) => state.competenciasList
);

export const getCompetenciasListIds = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.entitiesId
);

export const getCompetenciasList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCompetenciasListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.pagination
);

export const getCompetenciasListLoaded = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.loaded
);

export const getIsLoading = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.loading
);

export const getDeletingIds = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.deletedIds
);
