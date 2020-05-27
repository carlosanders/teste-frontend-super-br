import {createSelector} from '@ngrx/store';
import {getRootLotacoesAppState, RootLotacoesAppState, RootLotacoesState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import { Setor, Usuario } from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getRootLotacoesState = createSelector(
    getRootLotacoesAppState,
    (state: RootLotacoesAppState) => state.lotacoes
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

export const getHasLoadedSetor = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.loadedSetor.id === 'setorHandle' ? state.loadedSetor : false
);

export const getHasLoadedUsuario = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
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

export const getErrors = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.errors
);
