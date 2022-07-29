import {createSelector} from '@ngrx/store';
import {AssuntoState, getVisualizarProcessoAppState, VisualizarProcessoAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import {Assunto} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoState: any = createSelector(
    getVisualizarProcessoAppState,
    (state: VisualizarProcessoAppState) => state.assuntos
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

export const getPaginationAssuntos: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.pagination
);

export const getAssuntosLoaded: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.loaded
);

export const getIsAssuntosLoading: any = createSelector(
    getAssuntoState,
    (state: AssuntoState) => state.loading
);
