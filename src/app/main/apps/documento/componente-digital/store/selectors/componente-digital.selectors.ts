import {createSelector} from '@ngrx/store';
import {ComponenteDigitalAppState, ComponenteDigitalState, getComponenteDigitalAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {getRouterState} from '../../../../../../store';

const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentoHandle: any = createSelector(
    getRouterState,
    router => router?.state.params['documentoHandle']
);

export const getDocumento: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentoHandle,
    schemaDocumentoSelectors.entityProjector
);

export const getComponenteDigitalState: any = createSelector(
    getComponenteDigitalAppState,
    (state: ComponenteDigitalAppState) => state.componenteDigital
);

export const getIsLoading: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);

export const getIsSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getIsAutoSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.autosaving
);

export const getErrors: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getComponenteDigitalLoaded: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loaded
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
