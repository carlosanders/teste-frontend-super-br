import {createSelector} from '@ngrx/store';
import {getVinculacaoUsuarioEditAppState, VinculacaoUsuarioEditAppState, VinculacaoUsuarioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoUsuario} from '@cdk/models';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from '@cdk/normalizr';

const schemaVinculacaoUsuarioSelectors = createSchemaSelectors<VinculacaoUsuario>(vinculacaoUsuarioSchema);

export const getVinculacaoUsuarioEditState = createSelector(
    getVinculacaoUsuarioEditAppState,
    (state: VinculacaoUsuarioEditAppState) => state.vinculacaoUsuario
);

export const getVinculacaoUsuarioId = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoUsuario = createSelector(
    schemaVinculacaoUsuarioSelectors.getNormalizedEntities,
    getVinculacaoUsuarioId,
    schemaVinculacaoUsuarioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.loaded
);

export const getErrors = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.errors
);
