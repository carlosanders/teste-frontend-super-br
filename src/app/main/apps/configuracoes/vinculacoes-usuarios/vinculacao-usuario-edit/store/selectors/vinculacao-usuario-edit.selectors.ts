import {createSelector} from '@ngrx/store';
import {getVinculacaoUsuarioEditAppState, VinculacaoUsuarioEditAppState, VinculacaoUsuarioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoUsuario} from '@cdk/models';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from '@cdk/normalizr';

const schemaVinculacaoUsuarioSelectors = createSchemaSelectors<VinculacaoUsuario>(vinculacaoUsuarioSchema);

export const getVinculacaoUsuarioEditState: any = createSelector(
    getVinculacaoUsuarioEditAppState,
    (state: VinculacaoUsuarioEditAppState) => state.vinculacaoUsuario
);

export const getVinculacaoUsuarioId: any = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoUsuario: any = createSelector(
    schemaVinculacaoUsuarioSelectors.getNormalizedEntities,
    getVinculacaoUsuarioId,
    schemaVinculacaoUsuarioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getVinculacaoUsuarioEditState,
    (state: VinculacaoUsuarioEditState) => state.errors
);
