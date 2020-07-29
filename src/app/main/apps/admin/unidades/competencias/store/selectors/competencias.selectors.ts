import {createSelector} from '@ngrx/store';
import {getCompetenciasAppState, CompetenciasAppState, CompetenciasState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getCompetenciasState = createSelector(
    getCompetenciasAppState,
    (state: CompetenciasAppState) => state.competencias
);

export const getUnidadeId = createSelector(
    getCompetenciasState,
    (state: CompetenciasState) => (state.loaded && state.loaded.id === 'unidadeHandle') ? state.loaded.value : null
);

export const getUnidade = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoadedUnidade = createSelector(
    getCompetenciasState,
    (state: CompetenciasState) => state.loaded.id === 'unidadeHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getCompetenciasState,
    (state: CompetenciasState) => state.errors
);
