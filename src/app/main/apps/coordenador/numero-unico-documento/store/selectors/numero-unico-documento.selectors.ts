import {createSelector} from '@ngrx/store';
import {getNumeroUnicoDocumentoAppState, NumeroUnicoDocumentoAppState, NumeroUnicoDocumentoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getNumeroUnicoDocumentoState = createSelector(
    getNumeroUnicoDocumentoAppState,
    (state: NumeroUnicoDocumentoAppState) => state.numeros
);

export const getSetorId = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => state.loaded ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => state.loaded ? state.loaded : false
);

export const getErrors = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => state.errors
);
