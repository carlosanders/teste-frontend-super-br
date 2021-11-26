import {createSelector} from '@ngrx/store';
import {GeneroRelatorioState, getRelatorioCreateAppState, RelatorioCreateAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {GeneroRelatorio} from '@cdk/models/genero-relatorio.model';
import {generoRelatorio as generoRelatorioSchema} from '@cdk/normalizr';

const schemaGeneroRelatorioSelectors = createSchemaSelectors<GeneroRelatorio>(generoRelatorioSchema);

export const getGeneroRelatoriosState: any = createSelector(
    getRelatorioCreateAppState,
    (state: RelatorioCreateAppState) => state.generoRelatorios
);

export const getErrorsGeneroRelatorios: any = createSelector(
    getGeneroRelatoriosState,
    (state: GeneroRelatorioState) => state.errors
);

export const getGeneroRelatoriosId: any = createSelector(
    getGeneroRelatoriosState,
    (state: GeneroRelatorioState) => state.generoRelatoriosId
);

export const getGeneroRelatorios: any = createSelector(
    schemaGeneroRelatorioSelectors.getNormalizedEntities,
    getGeneroRelatoriosId,
    schemaGeneroRelatorioSelectors.entitiesProjector
);

export const getGeneroRelatoriosHasLoaded: any = createSelector(
    getGeneroRelatoriosState,
    (state: GeneroRelatorioState) => state.generoRelatoriosLoaded
);





