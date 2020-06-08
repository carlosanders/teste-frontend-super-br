import {createSelector} from '@ngrx/store';
import {getAssuntoAdministrativoEditAppState, AssuntoAdministrativoEditAppState, AssuntoAdministrativoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {AssuntoAdministrativo} from '@cdk/models';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr/assunto-administrativo.schema';

const schemaAssuntoAdministrativoSelectors = createSchemaSelectors<AssuntoAdministrativo>(assuntoAdministrativoSchema);

export const getAssuntoAdministrativoEditState = createSelector(
    getAssuntoAdministrativoEditAppState,
    (state: AssuntoAdministrativoEditAppState) => state.assuntoAdministrativo
);

export const getAssuntoAdministrativoId = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.entityId
);

export const getAssuntoAdministrativo = createSelector(
    schemaAssuntoAdministrativoSelectors.getNormalizedEntities,
    getAssuntoAdministrativoId,
    schemaAssuntoAdministrativoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.loaded
);

export const getErrors = createSelector(
    getAssuntoAdministrativoEditState,
    (state: AssuntoAdministrativoEditState) => state.errors
);
