import {createSelector} from '@ngrx/store';
import {CompetenciaEditAppState, CompetenciaEditState, getCompetenciaEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoSetorMunicipio} from '@cdk/models/vinculacao-setor-municipio.model';
import {setor as setorSchema, vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models';
import {getCompetenciasState} from '../../../store/selectors';
import {CompetenciasState} from '../../../store/reducers';

const schemaCompetenciaSelectors = createSchemaSelectors<VinculacaoSetorMunicipio>(vinculacaoSetorMunicipioSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getCompetenciaEditState: any = createSelector(
    getCompetenciaEditAppState,
    (state: CompetenciaEditAppState) => state.competencia
);

export const getCompetenciaId: any = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.loaded ? state.loaded.value : null
);

export const getCompetencia: any = createSelector(
    schemaCompetenciaSelectors.getNormalizedEntities,
    getCompetenciaId,
    schemaCompetenciaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getCompetenciaEditState,
    (state: CompetenciaEditState) => state.errors
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
