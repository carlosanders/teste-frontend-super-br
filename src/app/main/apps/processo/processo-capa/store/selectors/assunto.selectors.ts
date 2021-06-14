import {createSelector} from '@ngrx/store';
import {AssuntoState, getProcessoCapaAppState, ProcessoCapaAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import {Assunto} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoState = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.assuntos
);

export const getAssuntosIds = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.entitiesId
);

export const getAssuntos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntosIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationAssuntos = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.pagination
);

export const getAssuntosLoaded = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.loaded
);

export const getIsAssuntosLoading = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.loading
);
