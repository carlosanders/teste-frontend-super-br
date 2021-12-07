import {createSelector} from '@ngrx/store';
import {
    ComponenteDigitalState,
    DocumentoEditInteligenciaAppState,
    getDocumentoEditInteligenciaAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';

const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponenteDigitalState: any = createSelector(
    getDocumentoEditInteligenciaAppState,
    (state: DocumentoEditInteligenciaAppState) => state.componentesDigitais
);

export const getComponenteDigitalIsSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getComponenteDigitalErrors: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getComponenteDigitalLoading: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);

export const getComponenteDigitalLoaded: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loaded
);

export const getRepositorioComponenteDigital: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.repositorio
);

export const getComponenteDigitalId: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.componenteDigitalId
);

export const getComponenteDigital: any = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getComponenteDigitalId,
    schemaComponenteDigitalSelectors.entityProjector
);

export const getComponenteDigitalIds: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.entitiesId
);

export const getComponentesDigitais: any = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getComponenteDigitalIds,
    schemaComponenteDigitalSelectors.entitiesProjector
);
