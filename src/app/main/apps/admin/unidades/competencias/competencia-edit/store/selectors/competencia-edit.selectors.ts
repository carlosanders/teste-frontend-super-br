import {createSelector} from '@ngrx/store';
import {getCompetenciaEditAppState, CompetenciaEditAppState, CompetenciaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoSetorMunicipio} from '@cdk/models/vinculacao-setor-municipio.model';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr';
import {getCompetenciasState} from '../../../store/selectors';
import {CompetenciasState} from '../../../store/reducers';

const schemaCompetenciaSelectors = createSchemaSelectors<VinculacaoSetorMunicipio>(vinculacaoSetorMunicipioSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getCompetenciaEditState = createSelector(
    getCompetenciaEditAppState,
    (state: CompetenciaEditAppState) => state.competencia
);

export const getCompetenciaId = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.loaded ? state.loaded.value : null
);

export const getCompetencia = createSelector(
    schemaCompetenciaSelectors.getNormalizedEntities,
    getCompetenciaId,
    schemaCompetenciaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.loaded
);

export const getErrors = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.errors
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
