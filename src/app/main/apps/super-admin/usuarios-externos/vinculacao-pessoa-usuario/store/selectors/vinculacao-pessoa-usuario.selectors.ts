import {createSelector} from '@ngrx/store';
import {
    getVinculacaoPessoaUsuarioAppState,
    VinculacaoPessoaUsuarioAppState,
    VinculacaoPessoaUsuarioState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoPessoaUsuario} from '@cdk/models';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from '@cdk/normalizr/vinculacao-pessoa-usuario.schema';

const schemaVinculacaoPessoaUsuarioSelectors = createSchemaSelectors<VinculacaoPessoaUsuario>(vinculacaoPessoaUsuarioSchema);
// const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getVinculacaoPessoaUsuarioState = createSelector(
    getVinculacaoPessoaUsuarioAppState,
    (state: VinculacaoPessoaUsuarioAppState) => state.vinculacoesPessoaUsuario
);

export const getVinculacaoPessoaUsuarioId = createSelector(
    getVinculacaoPessoaUsuarioState,
    (state: VinculacaoPessoaUsuarioState) => (state.loaded && state.loaded.id === 'vinculacaoPessoaUsuarioHandle') ? state.loaded.value : null
);

// export const getUsuarioId = createSelector(
//     getVinculacaoPessoaUsuarioState,
//     (state: VinculacaoPessoaUsuarioState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
// );

export const getVinculacaoPessoaUsuario = createSelector(
    schemaVinculacaoPessoaUsuarioSelectors.getNormalizedEntities,
    getVinculacaoPessoaUsuarioId,
    schemaVinculacaoPessoaUsuarioSelectors.entityProjector
);

// export const getUsuario = createSelector(
//     schemaUsuarioSelectors.getNormalizedEntities,
//     getUsuarioId,
//     schemaUsuarioSelectors.entityProjector
// );

export const getHasLoadedVinculacaoPessoaUsuario = createSelector(
    getVinculacaoPessoaUsuarioState,
    (state: VinculacaoPessoaUsuarioState) => state.loaded.id === 'vinculacaoPessoaUsuarioHandle' ? state.loaded : false
);

// export const getHasLoadedUsuario = createSelector(
//     getVinculacaoPessoaUsuarioState,
//     (state: VinculacaoPessoaUsuarioState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
// );

export const getErrors = createSelector(
    getVinculacaoPessoaUsuarioState,
    (state: VinculacaoPessoaUsuarioState) => state.errors
);
