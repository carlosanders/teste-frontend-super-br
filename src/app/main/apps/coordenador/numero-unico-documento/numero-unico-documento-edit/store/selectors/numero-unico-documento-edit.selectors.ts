import {createSelector, select} from '@ngrx/store';
import {getNumeroUnicoDocumentoEditAppState, NumeroUnicoDocumentoEditAppState, NumeroUnicoDocumentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {NumeroUnicoDocumento, Setor} from '@cdk/models';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema} from '@cdk/normalizr';
import {setor as schemaSetor} from '@cdk/normalizr';
import {getNumeroUnicoDocumentoState} from '../../../store/selectors';
import {NumeroUnicoDocumentoState} from '../../../store/reducers';

const schemaNumeroUnicoDocumentoSelectors = createSchemaSelectors<NumeroUnicoDocumento>(numeroUnicoDocumentoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(schemaSetor);

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

export const getSetorId = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => (state.loaded) ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);
