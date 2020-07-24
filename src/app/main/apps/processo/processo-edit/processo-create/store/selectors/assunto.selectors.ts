import {createSelector} from '@ngrx/store';
import {getDadosBasicosAppState, DadosBasicosAppState, AssuntoState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema} from '@cdk/normalizr/assunto.schema';
import {Assunto} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.assuntos
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
