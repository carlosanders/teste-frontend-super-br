import {createSelector} from '@ngrx/store';
import {getRelatorioCreateAppState, RelatorioCreateAppState, GeneroRelatorioState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {GeneroRelatorio} from '@cdk/models/genero-relatorio.model';
import {generoRelatorio as generoRelatorioSchema} from '@cdk/normalizr/genero-relatorio.schema';

const schemaGeneroRelatorioSelectors = createSchemaSelectors<GeneroRelatorio>(generoRelatorioSchema);

export const getGeneroRelatoriosState = createSelector(
    getRelatorioCreateAppState,
    (state: RelatorioCreateAppState) => state.generoRelatorios
);

export const getErrorsGeneroRelatorios = createSelector(
    getGeneroRelatoriosState,
    (state: GeneroRelatorioState) => state.errors
);

export const getGeneroRelatoriosId = createSelector(
    getGeneroRelatoriosState,
    (state: GeneroRelatorioState) => state.generoRelatoriosId
);

export const getGeneroRelatorios = createSelector(
    schemaGeneroRelatorioSelectors.getNormalizedEntities,
    getGeneroRelatoriosId,
    schemaGeneroRelatorioSelectors.entitiesProjector
);

export const getGeneroRelatoriosHasLoaded = createSelector(
    getGeneroRelatoriosState,
    (state: GeneroRelatorioState) => state.generoRelatoriosLoaded
);





