import {createSelector} from '@ngrx/store';
import {getTipoRelatorioEditAppState, TipoRelatorioEditAppState, TipoRelatorioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr/tipo-relatorio.schema';

const schemaTipoRelatorioSelectors = createSchemaSelectors<TipoRelatorio>(tipoRelatorioSchema);

export const getTipoRelatorioEditState = createSelector(
    getTipoRelatorioEditAppState,
    (state: TipoRelatorioEditAppState) => state.tipoRelatorio
);

export const getTipoRelatorioId = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.entityId
);

export const getTipoRelatorio = createSelector(
    schemaTipoRelatorioSelectors.getNormalizedEntities,
    getTipoRelatorioId,
    schemaTipoRelatorioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.loaded
);

export const getErrors = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.errors
);
