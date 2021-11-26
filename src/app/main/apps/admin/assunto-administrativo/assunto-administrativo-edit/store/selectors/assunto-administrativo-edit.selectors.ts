import {createSelector} from '@ngrx/store';
import {
    AssuntoAdministrativoEditAppState,
    AssuntoAdministrativoEditState,
    getAssuntoAdministrativoEditAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {AssuntoAdministrativo} from '@cdk/models';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr';

const schemaAssuntoAdministrativoSelectors = createSchemaSelectors<AssuntoAdministrativo>(assuntoAdministrativoSchema);

export const getAssuntoAdministrativoEditState: any = createSelector(
    getAssuntoAdministrativoEditAppState,
    (state: AssuntoAdministrativoEditAppState) => state.assuntoAdministrativo
);

export const getAssuntoAdministrativoId: any = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.entityId
);

export const getAssuntoAdministrativo: any = createSelector(
    schemaAssuntoAdministrativoSelectors.getNormalizedEntities,
    getAssuntoAdministrativoId,
    schemaAssuntoAdministrativoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.errors
);
