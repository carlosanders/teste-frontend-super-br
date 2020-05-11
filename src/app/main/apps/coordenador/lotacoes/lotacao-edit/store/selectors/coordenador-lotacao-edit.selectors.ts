import {createSelector} from '@ngrx/store';
import {getLotacaoEditAppState, LotacaoEditAppState, LotacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema} from '@cdk/normalizr/lotacao.schema';
import {Setor, Usuario} from '@cdk/models';
import {setor as schemaSetor} from '@cdk/normalizr/setor.schema';
import {usuario as schemaUsuario} from '@cdk/normalizr/usuario.schema';
import {getLotacoesAppState, LotacoesAppState, LotacoesState} from '../../../store/reducers';

const schemaLotacaoSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(schemaSetor);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getLotacaoEditState = createSelector(
    getLotacaoEditAppState,
    (state: LotacaoEditAppState) => state.lotacao
);

export const getLotacaoId = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getLotacoesState = createSelector(
    getLotacoesAppState,
    (state: LotacoesAppState) => state.lotacoes
);

export const getLotacao = createSelector(
    schemaLotacaoSelectors.getNormalizedEntities,
    getLotacaoId,
    schemaLotacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.errors
);

export const getSetorId = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loadedSetor && state.loadedSetor.id === 'setorHandle') ? state.loadedSetor.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUsuarioId = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);