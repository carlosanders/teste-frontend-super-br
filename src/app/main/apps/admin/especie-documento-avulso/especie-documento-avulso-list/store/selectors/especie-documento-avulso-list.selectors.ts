import {createSelector} from '@ngrx/store';
import {EspecieDocumentoAvulsoListAppState, EspecieDocumentoAvulsoListState, getEspecieDocumentoAvulsoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieDocumentoAvulso as especieDocumentoAvulsoSchema} from '@cdk/normalizr';
import {EspecieDocumentoAvulso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieDocumentoAvulso>(especieDocumentoAvulsoSchema);

export const getEspecieDocumentoAvulsoListState: any = createSelector(
    getEspecieDocumentoAvulsoListAppState,
    (state: EspecieDocumentoAvulsoListAppState) => state.especieDocumentoAvulsoList
);

export const getEspecieDocumentoAvulsoListIds: any = createSelector(
    getEspecieDocumentoAvulsoListState,
    (state: EspecieDocumentoAvulsoListState) => state.entitiesId
);

export const getEspecieDocumentoAvulsoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieDocumentoAvulsoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEspecieDocumentoAvulsoListState,
    (state: EspecieDocumentoAvulsoListState) => state.pagination
);

export const getEspecieDocumentoAvulsoListLoaded: any = createSelector(
    getEspecieDocumentoAvulsoListState,
    (state: EspecieDocumentoAvulsoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEspecieDocumentoAvulsoListState,
    (state: EspecieDocumentoAvulsoListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getEspecieDocumentoAvulsoListState,
    (state: EspecieDocumentoAvulsoListState) => state.deletingErrors
);

