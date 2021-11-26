import {createSelector} from '@ngrx/store';
import {
    getRepositoriosEspecieSetorEditAppState,
    RepositoriosEspecieSetorEditAppState,
    RepositoriosEspecieSetorEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoRepositorio} from '@cdk/models/vinculacao-repositorio.model';
import {
    modalidadeOrgaoCentral as schemaOrgaoCentral,
    repositorio as schemaRepositorio,
    vinculacaoRepositorio as vinculacaoRepositorioSchema
} from '@cdk/normalizr';
import {getRepositoriosEspecieSetorState} from '../../../store/selectors';
import {getCoordenadorState} from '../../../../../store/selectors';
import {RepositoriosEspecieSetorState} from '../../../store/reducers';
import {ModalidadeOrgaoCentral, Repositorio} from '@cdk/models';
import {CoordenadorState} from '../../../../../store/reducers';

const schemaVinculacaoRepositorioSelectors = createSchemaSelectors<VinculacaoRepositorio>(vinculacaoRepositorioSchema);
const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(schemaRepositorio);
const schemaOrgaoCentralSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(schemaOrgaoCentral);

export const getRepositoriosEspecieSetorEditState: any = createSelector(
    getRepositoriosEspecieSetorEditAppState,
    (state: RepositoriosEspecieSetorEditAppState) => state.vinculacaoRepositorio
);

export const getVinculacaoRepositorioId: any = createSelector(
    getRepositoriosEspecieSetorEditState,
    (state: RepositoriosEspecieSetorEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoRepositorio: any = createSelector(
    schemaVinculacaoRepositorioSelectors.getNormalizedEntities,
    getVinculacaoRepositorioId,
    schemaVinculacaoRepositorioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRepositoriosEspecieSetorEditState,
    (state: RepositoriosEspecieSetorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRepositoriosEspecieSetorEditState,
    (state: RepositoriosEspecieSetorEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRepositoriosEspecieSetorEditState,
    (state: RepositoriosEspecieSetorEditState) => state.errors
);

export const getRepositorioId: any = createSelector(
    getRepositoriosEspecieSetorState,
    (state: RepositoriosEspecieSetorState) => (state.loaded && state.loaded.id === 'repositorioHandle') ? state.loaded.value : null
);

export const getRepositorio: any = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositorioId,
    schemaRepositorioSelectors.entityProjector
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
