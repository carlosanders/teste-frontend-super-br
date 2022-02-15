import {createSelector} from '@ngrx/store';
import {CompetenciasAppState, CompetenciasState, getCompetenciasAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getCompetenciasState: any = createSelector(
    getCompetenciasAppState,
    (state: CompetenciasAppState) => state.competencias
);

export const getUnidadeId: any = createSelector(
    getCompetenciasState,
    (state: CompetenciasState) => (state.loaded && state.loaded.id === 'unidadeHandle') ? state.loaded.value : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoadedUnidade: any = createSelector(
    getCompetenciasState,
    (state: CompetenciasState) => state.loaded.id === 'unidadeHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getCompetenciasState,
    (state: CompetenciasState) => state.errors
);
