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

export const getDocumentoEditRestaurarState: any = createSelector(
    getDocumentoEditRestaurarAppState,
    (state: DocumentoEditRestaurarAppState) => state.documento
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

export const getIsUndeleting: any = createSelector(
    getDocumentoEditRestaurarState,
    (state: DocumentoEditRestaurarState) => state.undeleting
);

export const getErrors: any = createSelector(
    getDocumentoEditRestaurarState,
    (state: DocumentoEditRestaurarState) => state.errors
);
