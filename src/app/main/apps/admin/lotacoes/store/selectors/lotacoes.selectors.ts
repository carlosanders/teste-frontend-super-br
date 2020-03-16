import {createSelector} from '@ngrx/store';
import {getLotacoesAppState, LotacoesAppState, LotacoesState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor, Usuario} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getLotacoesState = createSelector(
    getLotacoesAppState,
    (state: LotacoesAppState) => state.lotacoes
);

export const getSetorId = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getUsuarioId = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getHasLoadedSetor = createSelector(
    getLotacoesState,
    (state: LotacoesState) => state.loaded.id === 'setorHandle' ? state.loaded : false
);

export const getHasLoadedUsuario = createSelector(
    getLotacoesState,
    (state: LotacoesState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getLotacoesState,
    (state: LotacoesState) => state.errors
);