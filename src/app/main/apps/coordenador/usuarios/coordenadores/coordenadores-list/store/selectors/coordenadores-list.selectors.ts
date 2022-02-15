import {createSelector} from '@ngrx/store';
import {CoordenadoresListAppState, CoordenadoresListState, getCoordenadoresListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {coordenador as coordenadoreschema} from '@cdk/normalizr';
import {Coordenador} from '@cdk/models/coordenador.model';
import {getProcessoState, ProcessoState} from "../../../../../../processo/store";

const schemaSelectors = createSchemaSelectors<Coordenador>(coordenadoreschema);

export const getCoordenadoresListState: any = createSelector(
    getCoordenadoresListAppState,
    (state: CoordenadoresListAppState) => state.coordenadoresList
);

export const getCoordenadoresListIds: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.entitiesId
);

export const getCoordenadoresList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCoordenadoresListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.pagination
);

export const getCoordenadoresListLoaded: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.deletingErrors
);

export const getErrors: any = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.errors
);
