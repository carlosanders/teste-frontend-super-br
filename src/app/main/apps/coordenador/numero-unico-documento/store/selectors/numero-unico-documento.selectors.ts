import {createSelector} from '@ngrx/store';
import {getNumeroUnicoDocumentoAppState, NumeroUnicoDocumentoAppState, NumeroUnicoDocumentoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getNumeroUnicoDocumentoState: any = createSelector(
    getNumeroUnicoDocumentoAppState,
    (state: NumeroUnicoDocumentoAppState) => state.numeros
);

export const getSetorId: any = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => state.loaded ? state.loaded.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => state.loaded ? state.loaded : false
);

export const getErrors: any = createSelector(
    getNumeroUnicoDocumentoState,
    (state: NumeroUnicoDocumentoState) => state.errors
);
