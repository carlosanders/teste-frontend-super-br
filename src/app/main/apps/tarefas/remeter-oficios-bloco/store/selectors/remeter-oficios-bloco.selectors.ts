import {createSelector} from '@ngrx/store';
import {
    RemeterOficiosBlocoAppState,
    RemeterOficiosBlocoState,
    getRemeterOficiosBlocoAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getRemeterOficiosBlocoState: any = createSelector(
    getRemeterOficiosBlocoAppState,
    (state: RemeterOficiosBlocoAppState) => state.remeterOficiosBloco
);

export const getPagination: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.pagination
);

export const getLoaded: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.loaded
);

export const isLoading: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.loading
);

export const getRemeterIds: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.remeterIds
);

export const getIds: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.entitiesId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getIds,
    schemaDocumentoSelectors.entitiesProjector
);

