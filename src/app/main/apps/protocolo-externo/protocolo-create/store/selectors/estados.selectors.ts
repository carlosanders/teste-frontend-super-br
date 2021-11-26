import {createSelector} from '@ngrx/store';
import {EstadoState, getProtocoloCreateAppState, ProtocoloCreateAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Estado} from '@cdk/models';
import {estado as estadoSchema} from '@cdk/normalizr';

const schemaEstadoSelectors = createSchemaSelectors<Estado>(estadoSchema);

export const getEstadosState: any = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.estados
);

export const getErrorsEstados: any = createSelector(
    getEstadosState,
    (state: EstadoState) => state.errors
);

export const getEstadosId: any = createSelector(
    getEstadosState,
    (state: EstadoState) => state.estadosId
);

export const getEstados: any = createSelector(
    schemaEstadoSelectors.getNormalizedEntities,
    getEstadosId,
    schemaEstadoSelectors.entitiesProjector
);

export const getEstadosHasLoaded: any = createSelector(
    getEstadosState,
    (state: EstadoState) => state.estadosLoaded
);





