import {createSelector} from '@ngrx/store';
import {
    getVinculacaoPessoaUsuarioEditAppState,
    VinculacaoPessoaUsuarioEditAppState,
    VinculacaoPessoaUsuarioEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoPessoaUsuario} from '@cdk/models/vinculacao-pessoa-usuario.model';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from '@cdk/normalizr';
import {getVinculacaoPessoaUsuarioAppState, VinculacaoPessoaUsuarioAppState} from '../../../store/reducers';

const schemaVinculacaoPessoaUsuarioSelectors = createSchemaSelectors<VinculacaoPessoaUsuario>(vinculacaoPessoaUsuarioSchema);

export const getVinculacaoPessoaUsuarioEditState = createSelector(
    getVinculacaoPessoaUsuarioEditAppState,
    (state: VinculacaoPessoaUsuarioEditAppState) => state.vinculacaoPessoaUsuario
);

export const getVinculacaoPessoaUsuarioState = createSelector(
    getVinculacaoPessoaUsuarioAppState,
    (state: VinculacaoPessoaUsuarioAppState) => state.vinculacoesPessoaUsuario
);

export const getVinculacaoPessoaUsuarioId = createSelector(
    getVinculacaoPessoaUsuarioEditState,
    (state: VinculacaoPessoaUsuarioEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoPessoaUsuario = createSelector(
    schemaVinculacaoPessoaUsuarioSelectors.getNormalizedEntities,
    getVinculacaoPessoaUsuarioId,
    schemaVinculacaoPessoaUsuarioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getVinculacaoPessoaUsuarioEditState,
    (state: VinculacaoPessoaUsuarioEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getVinculacaoPessoaUsuarioEditState,
    (state: VinculacaoPessoaUsuarioEditState) => state.loaded
);

export const getErrors = createSelector(
    getVinculacaoPessoaUsuarioEditState,
    (state: VinculacaoPessoaUsuarioEditState) => state.errors
);
