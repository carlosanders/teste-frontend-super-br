import {createSelector} from '@ngrx/store';
import {getLotacoesAppState, LotacoesAppState, LotacoesState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor, Usuario} from '@cdk/models';
import {setor as setorSchema, usuario as usuarioSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getLotacoesState: any = createSelector(
    getLotacoesAppState,
    (state: LotacoesAppState) => state.lotacoes
);

export const getSetorId: any = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loadedSetor.value : null
);

export const getUsuarioId: any = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getHasLoadedSetor: any = createSelector(
    getLotacoesState,
    (state: LotacoesState) => state.loadedSetor && state.loadedSetor.id === 'setorHandle' ? state.loadedSetor : false
);

export const getHasLoadedUsuario: any = createSelector(
    getLotacoesState,
    (state: LotacoesState) => state.loaded && state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getLotacoesState,
    (state: LotacoesState) => state.errors
);
