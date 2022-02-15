import {createSelector} from '@ngrx/store';
import {
    DocumentoEditDadosBasicosAppState,
    DocumentoEditDadosBasicosState,
    getDocumentoEditDadosBasicosAppState
} from '../../../dados-basicos/store/reducers';
import {DocumentoAppState, DocumentoState, getDocumentoAppState} from '../../../../store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentoState: any = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.documento
);

export const getDocumentoId: any = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.loaded.value : null
);

export const getDocumento: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentoId,
    schemaDocumentoSelectors.entityProjector
);

export const getDocumentoEditDadosBasicosState: any = createSelector(
    getDocumentoEditDadosBasicosAppState,
    (state: DocumentoEditDadosBasicosAppState) => state.documento
);

export const getIsSaving: any = createSelector(
    getDocumentoEditDadosBasicosState,
    (state: DocumentoEditDadosBasicosState) => state.saving
);
