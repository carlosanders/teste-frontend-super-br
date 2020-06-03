import {createSelector} from '@ngrx/store';
import {getTipoRelatorioCreateAppState, TipoRelatorioCreateAppState, TipoRelatorioCreateState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr/tipo-relatorio.schema';

const schemaTipoRelatorioSelectors = createSchemaSelectors<TipoRelatorio>(tipoRelatorioSchema);

export const getTipoRelatorioCreateState = createSelector(
    getTipoRelatorioCreateAppState,
    (state: TipoRelatorioCreateAppState) => state.tipoRelatorio
);

export const getTipoRelatorioId = createSelector(
    getTipoRelatorioCreateState,
    (state: TipoRelatorioCreateState) => state.entityId
);

export const getTipoRelatorio = createSelector(
    schemaTipoRelatorioSelectors.getNormalizedEntities,
    getTipoRelatorioId,
    schemaTipoRelatorioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTipoRelatorioCreateState,
    (state: TipoRelatorioCreateState) => state.saving
);

export const getHasLoaded = createSelector(
    getTipoRelatorioCreateState,
    (state: TipoRelatorioCreateState) => state.loaded
);

export const getErrors = createSelector(
    getTipoRelatorioCreateState,
    (state: TipoRelatorioCreateState) => state.errors
);
