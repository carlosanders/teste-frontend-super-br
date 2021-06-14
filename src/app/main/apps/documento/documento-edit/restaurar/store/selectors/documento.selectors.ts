import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {
    DocumentoEditRestaurarAppState,
    DocumentoEditRestaurarState,
    getDocumentoEditRestaurarAppState
} from '../reducers';
import {getDocumentoState} from '../../../../store/selectors';
import {DocumentoState} from '../../../../store/reducers';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);
const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getDocumentoEditRestaurarState = createSelector(
    getDocumentoEditRestaurarAppState,
    (state: DocumentoEditRestaurarAppState) => state.documento
);

export const getDocumentoId = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.loaded.value : null
);

export const getCurrentComponenteDigitalId = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.currentComponenteDigitalId : null
);

export const getCurrentComponenteDigital = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getCurrentComponenteDigitalId,
    schemaComponenteDigitalSelectors.entityProjector
);

export const getDocumento = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentoId,
    schemaDocumentoSelectors.entityProjector
);

export const getDocumentoLoaded = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded
);

export const getIsLoading = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loading
);

export const getIsUndeleting = createSelector(
    getDocumentoEditRestaurarState,
    (state: DocumentoEditRestaurarState) => state.undeleting
);

export const getErrors = createSelector(
    getDocumentoEditRestaurarState,
    (state: DocumentoEditRestaurarState) => state.errors
);
