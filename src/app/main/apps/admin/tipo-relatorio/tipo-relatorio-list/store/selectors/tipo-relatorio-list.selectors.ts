import {createSelector} from '@ngrx/store';
import {getTipoRelatorioListAppState, TipoRelatorioListAppState, TipoRelatorioListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';

const schemaSelectors = createSchemaSelectors<TipoRelatorio>(tipoRelatorioSchema);

export const getTipoRelatorioListState: any = createSelector(
    getTipoRelatorioListAppState,
    (state: TipoRelatorioListAppState) => state.tipoRelatorioList
);

export const getTipoRelatorioListIds: any = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.entitiesId
);

export const getTipoRelatorioList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoRelatorioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.pagination
);

export const getTipoRelatorioListLoaded: any = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.deletingErrors
);
