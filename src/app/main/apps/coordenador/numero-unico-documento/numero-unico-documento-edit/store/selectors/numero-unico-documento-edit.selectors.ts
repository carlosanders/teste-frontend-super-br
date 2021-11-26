import {createSelector} from '@ngrx/store';
import {
    getNumeroUnicoDocumentoEditAppState,
    NumeroUnicoDocumentoEditAppState,
    NumeroUnicoDocumentoEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {NumeroUnicoDocumento, Setor} from '@cdk/models';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema, setor as schemaSetor} from '@cdk/normalizr';
import {getNumeroUnicoDocumentoState} from '../../../store/selectors';
import {NumeroUnicoDocumentoState} from '../../../store/reducers';

const schemaNumeroUnicoDocumentoSelectors = createSchemaSelectors<NumeroUnicoDocumento>(numeroUnicoDocumentoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(schemaSetor);

export const getNumeroUnicoDocumentoEditState: any = createSelector(
    getNumeroUnicoDocumentoEditAppState,
    (state: NumeroUnicoDocumentoEditAppState) => state.numeroUnicoDocumento
);

export const getNumeroUnicoDocumentoId: any = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.loaded ? state.loaded.value : null
);

export const getNumeroUnicoDocumento: any = createSelector(
    schemaNumeroUnicoDocumentoSelectors.getNormalizedEntities,
    getNumeroUnicoDocumentoId,
    schemaNumeroUnicoDocumentoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getNumeroUnicoDocumentoEditState,
    (state: NumeroUnicoDocumentoEditState) => state.errors
);

export const getSetorId: any = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => (state.loaded) ? state.loaded.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);
