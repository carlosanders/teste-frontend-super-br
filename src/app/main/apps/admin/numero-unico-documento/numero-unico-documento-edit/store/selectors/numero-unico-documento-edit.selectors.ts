import {createSelector} from '@ngrx/store';
import {getNumeroUnicoDocumentoEditAppState, NumeroUnicoDocumentoEditAppState, NumeroUnicoDocumentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {NumeroUnicoDocumento} from '@cdk/models';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema} from '@cdk/normalizr/numero-unico-documento.schema';

const schemaNumeroUnicoDocumentoSelectors = createSchemaSelectors<NumeroUnicoDocumento>(numeroUnicoDocumentoSchema);

export const getNumeroUnicoDocumentoEditState = createSelector(
    getNumeroUnicoDocumentoEditAppState,
    (state: NumeroUnicoDocumentoEditAppState) => state.numeroUnicoDocumento
);

export const getNumeroUnicoDocumentoId = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.loaded ? state.loaded.value : null
);

export const getNumeroUnicoDocumento = createSelector(
    schemaNumeroUnicoDocumentoSelectors.getNormalizedEntities,
    getNumeroUnicoDocumentoId,
    schemaNumeroUnicoDocumentoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.loaded
);

export const getErrors = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.errors
);
