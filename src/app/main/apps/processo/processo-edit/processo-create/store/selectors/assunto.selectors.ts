import {createSelector} from '@ngrx/store';
import {AssuntoState, DadosBasicosAppState, getDadosBasicosAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import {Assunto} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.assuntos
);

export const getAssuntosIds: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.entitiesId
);

export const getAssuntos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntosIds,
    schemaSelectors.entitiesProjector
);

export const getAssuntosPagination: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.pagination
);

export const getAssuntosLoaded: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.loaded
);

export const getAssuntosIsLoading: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.loading
);

export const getAssuntosDeletingIds: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.deletingIds
);

export const getAssuntosDeletedIds: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.deletedIds
);

export const getAssuntoIsSaving: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.saving
);

export const getAssuntoErrors: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.errors
);
