import {createSelector} from '@ngrx/store';
import {DocumentoAppState, DocumentoState, getDocumentoAppState} from 'app/main/apps/documento/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);
const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getDocumentoState: any = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.documento
);

export const getDocumentoId: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.loaded.value : null
);

export const getCurrentComponenteDigitalId: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.currentComponenteDigitalId : null
);

export const getCurrentComponenteDigital: any = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getCurrentComponenteDigitalId,
    schemaComponenteDigitalSelectors.entityProjector
);

export const getDocumento: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentoId,
    schemaDocumentoSelectors.entityProjector
);

export const getDocumentoLoaded: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loading
);

export const getIsSaving: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.saving
);

export const getErrors: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.errors
);

export const getSavingVinculacaoEtiquetaId: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.savingVinculacaoEtiquetaId
);

export const getVinculacaoEtiquetaErrors: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.vinculacaoEtiquetaErrors
);
