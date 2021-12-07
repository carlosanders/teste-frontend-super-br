import {createSelector} from '@ngrx/store';
import {RoleEditAppState, RoleEditState, getRoleEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoRole} from '@cdk/models/vinculacao-role.model';
import {vinculacaoRole as roleSchema, usuario as schemaUsuario} from '@cdk/normalizr';
import {getRolesState} from '../../../store/selectors';
import {RolesState} from '../../../store/reducers';
import {Usuario} from '@cdk/models';

const schemaRoleSelectors = createSchemaSelectors<VinculacaoRole>(roleSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getRoleEditState: any = createSelector(
    getRoleEditAppState,
    (state: RoleEditAppState) => state.role
);

export const getRoleId: any = createSelector(
    getRoleEditState,
    (state: RoleEditState) => state.loaded ? state.loaded.value : null
);

export const getRole: any = createSelector(
    schemaRoleSelectors.getNormalizedEntities,
    getRoleId,
    schemaRoleSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRoleEditState,
    (state: RoleEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRoleEditState,
    (state: RoleEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRoleEditState,
    (state: RoleEditState) => state.errors
);

export const getUsuarioId: any = createSelector(
    getRolesState,
    (state: RolesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);
