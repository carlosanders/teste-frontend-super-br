import {createSelector} from '@ngrx/store';
import {getRootLotacaoEditAppState, RootLotacaoEditAppState, RootLotacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {getRootLotacoesState} from '../../../store/selectors';
import {RootLotacoesState} from '../../../store/reducers';
import { Setor, Usuario } from '@cdk/models';
import {setor as schemaSetor} from '@cdk/normalizr';
import { usuario as schemaUsuario } from '@cdk/normalizr';

const schemaLotacaoSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(schemaSetor);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getRootLotacaoEditState = createSelector(
    getRootLotacaoEditAppState,
    (state: RootLotacaoEditAppState) => state.lotacao
);

export const getLotacaoId = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getLotacao = createSelector(
    schemaLotacaoSelectors.getNormalizedEntities,
    getLotacaoId,
    schemaLotacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.errors
);

export const getSetorId = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => (state.loadedSetor && state.loadedSetor.id === 'setorHandle') ? state.loadedSetor.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUsuarioId = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);