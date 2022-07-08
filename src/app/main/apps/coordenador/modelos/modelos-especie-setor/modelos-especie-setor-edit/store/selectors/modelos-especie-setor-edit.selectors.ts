import {createSelector} from '@ngrx/store';
import {
    getModelosEspecieSetorEditAppState,
    ModelosEspecieSetorEditAppState,
    ModelosEspecieSetorEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoModelo} from '@cdk/models/vinculacao-modelo.model';
import {
    modalidadeOrgaoCentral as schemaOrgaoCentral,
    modelo as schemaModelo,
    setor as schemaUnidade,
    vinculacaoModelo as vinculacaoModeloSchema
} from '@cdk/normalizr';
import {getModelosEspecieSetorState} from '../../../store/selectors';
import {getCoordenadorState} from '../../../../../store/selectors';
import {ModelosEspecieSetorState} from '../../../store/reducers';
import {ModalidadeOrgaoCentral, Modelo, Setor} from '@cdk/models';
import {CoordenadorState} from '../../../../../store/reducers';

const schemaVinculacaoModeloSelectors = createSchemaSelectors<VinculacaoModelo>(vinculacaoModeloSchema);
const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);
const schemaOrgaoCentralSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(schemaOrgaoCentral);
const schemaUnidadeSelectors = createSchemaSelectors<Setor>(schemaUnidade);

export const getModelosEspecieSetorEditState: any = createSelector(
    getModelosEspecieSetorEditAppState,
    (state: ModelosEspecieSetorEditAppState) => state.vinculacaoModelo
);

export const getVinculacaoModeloId: any = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoModelo: any = createSelector(
    schemaVinculacaoModeloSelectors.getNormalizedEntities,
    getVinculacaoModeloId,
    schemaVinculacaoModeloSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getModelosEspecieSetorEditState,
    (state: ModelosEspecieSetorEditState) => state.errors
);

export const getModeloId: any = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => (state.loaded && state.loaded.id === 'modeloHandle') ? state.loaded.value : null
);

export const getModelo: any = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getModalidadeOrgaoCentralId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.orgaoId ? state.orgaoId : null
);

export const getModalidadeOrgaoCentral: any = createSelector(
    schemaOrgaoCentralSelectors.getNormalizedEntities,
    getModalidadeOrgaoCentralId,
    schemaOrgaoCentralSelectors.entityProjector
);

export const getUnidadeId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.unidadeId ? state.unidadeId : null
);

export const getUnidade: any = createSelector(
    schemaUnidadeSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaUnidadeSelectors.entityProjector
);
