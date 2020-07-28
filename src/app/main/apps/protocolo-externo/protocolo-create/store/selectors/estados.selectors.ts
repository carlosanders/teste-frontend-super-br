import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, EstadoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Estado} from '@cdk/models';
import {estado as estadoSchema} from '@cdk/normalizr';

const schemaEstadoSelectors = createSchemaSelectors<Estado>(estadoSchema);

export const getEstadosState = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.estados
);

export const getErrorsEstados = createSelector(
    getEstadosState,
    (state: EstadoState) => state.errors
);

export const getEstadosId = createSelector(
    getEstadosState,
    (state: EstadoState) => state.estadosId
);

export const getEstados = createSelector(
    schemaEstadoSelectors.getNormalizedEntities,
    getEstadosId,
    schemaEstadoSelectors.entitiesProjector
);

export const getEstadosHasLoaded = createSelector(
    getEstadosState,
    (state: EstadoState) => state.estadosLoaded
);





