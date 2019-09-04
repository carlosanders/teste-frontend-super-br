import {createSelector} from '@ngrx/store';
import {DocumentoAppState, getDocumentoAppState, ComponenteDigitalState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';

const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponenteDigitalState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.componentesDigitais
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
