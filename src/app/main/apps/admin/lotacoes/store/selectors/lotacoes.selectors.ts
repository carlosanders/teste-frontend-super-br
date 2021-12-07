import {createSelector} from '@ngrx/store';
import {getRootLotacoesAppState, RootLotacoesAppState, RootLotacoesState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor, Usuario} from '@cdk/models';
import {setor as setorSchema, usuario as usuarioSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getRootLotacoesState: any = createSelector(
    getRootLotacoesAppState,
    (state: RootLotacoesAppState) => state.lotacoes
);

export const getSetorId: any = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => (state.loadedSetor && state.loadedSetor.id === 'setorHandle') ? state.loadedSetor.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoadedSetor: any = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.loadedSetor.id === 'setorHandle' ? state.loadedSetor : false
);

export const getHasLoadedUsuario: any = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getUsuarioId: any = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getErrors: any = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.errors
);
