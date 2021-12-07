import {createSelector} from '@ngrx/store';
import {CompetenciasListAppState, CompetenciasListState, getCompetenciasListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr';
import {VinculacaoSetorMunicipio} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoSetorMunicipio>(vinculacaoSetorMunicipioSchema);

export const getCompetenciasListState: any = createSelector(
    getCompetenciasListAppState,
    (state: CompetenciasListAppState) => state.competenciasList
);

export const getCompetenciasListIds: any = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.entitiesId
);

export const getCompetenciasList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCompetenciasListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.pagination
);

export const getCompetenciasListLoaded: any = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getCompetenciasListState,
    (state: CompetenciasListState) => state.deletingErrors
);
