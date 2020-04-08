import {createSelector} from '@ngrx/store';
import {getModelosEspecieSetorEditAppState, ModelosEspecieSetorEditAppState, ModelosEspecieSetorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoModelo} from '@cdk/models/vinculacao-modelo.model';
import {vinculacaoModelo as vinculacaoModeloSchema} from '@cdk/normalizr/vinculacao-modelo.schema';
import {getModelosEspecieSetorState} from '../../../store/selectors';
import {getCoordenadorState} from "../../../../../store/selectors";
import {ModelosEspecieSetorState} from '../../../store/reducers';
import {ModalidadeOrgaoCentral, Modelo} from '@cdk/models';
import {modelo as schemaModelo} from '@cdk/normalizr/modelo.schema';
import {modalidadeOrgaoCentral as schemaOrgaoCentral} from '@cdk/normalizr/modalidade-orgao-central.schema';
import {CoordenadorState} from '../../../../../store/reducers';

const schemaVinculacaoModeloSelectors = createSchemaSelectors<VinculacaoModelo>(vinculacaoModeloSchema);
const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);
const schemaOrgaoCentralSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(schemaOrgaoCentral);

export const getModelosEspecieSetorEditState = createSelector(
    getModelosEspecieSetorEditAppState,
    (state: ModelosEspecieSetorEditAppState) => state.vinculacaoModelo
);

export const getVinculacaoModeloId = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoModelo = createSelector(
    schemaVinculacaoModeloSelectors.getNormalizedEntities,
    getVinculacaoModeloId,
    schemaVinculacaoModeloSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.loaded
);

export const getErrors = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.errors
);

export const getModeloId = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => (state.loaded && state.loaded.id === 'modeloHandle') ? state.loaded.value : null
);

export const getModelo = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getOrgaoCentralId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.orgaoId ? state.orgaoId : null
);

export const getOrgaoCentral = createSelector(
    schemaOrgaoCentralSelectors.getNormalizedEntities,
    getOrgaoCentralId,
    schemaOrgaoCentralSelectors.entityProjector
);
