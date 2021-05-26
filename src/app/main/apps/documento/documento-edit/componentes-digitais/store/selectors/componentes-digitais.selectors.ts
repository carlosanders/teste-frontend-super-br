import {createSelector} from '@ngrx/store';
import {DocumentoEditComponentesDigitaisAppState, getDocumentoEditComponentesDigitaisAppState, ComponenteDigitalState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';

const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponenteDigitalState = createSelector(
    getDocumentoEditComponentesDigitaisAppState,
    (state: DocumentoEditComponentesDigitaisAppState) => state.componentesDigitais
);

export const getComponenteDigitalIsSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getComponenteDigitalErrors = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getComponenteDigitalLoading = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);

export const getComponenteDigitalLoaded = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loaded
);

export const getRepositorioComponenteDigital = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.repositorio
);

export const getComponenteDigitalId = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.componenteDigitalId
);

export const getComponenteDigital = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getComponenteDigitalId,
    schemaComponenteDigitalSelectors.entityProjector
);

export const getComponenteDigitalIds = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.entitiesId
);

export const getComponentesDigitais = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getComponenteDigitalIds,
    schemaComponenteDigitalSelectors.entitiesProjector
);

export const getDeletingComponenteDigitalIds = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.deletingIds
);

export const getDeletedComponenteDigitalIds = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.deletedIds
);

export const getComponenteDigitalPagination = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.pagination
);

export const getIsSavingComponenteDigital = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getErrorsComponenteDigital = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);
