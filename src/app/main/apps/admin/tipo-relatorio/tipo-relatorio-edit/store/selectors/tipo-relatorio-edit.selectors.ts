import {createSelector} from '@ngrx/store';
import {getTipoRelatorioEditAppState, TipoRelatorioEditAppState, TipoRelatorioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr';

const schemaTipoRelatorioSelectors = createSchemaSelectors<TipoRelatorio>(tipoRelatorioSchema);

export const getTipoRelatorioEditState: any = createSelector(
    getTipoRelatorioEditAppState,
    (state: TipoRelatorioEditAppState) => state.tipoRelatorio
);

export const getTipoRelatorioId: any = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.entityId
);

export const getTipoRelatorio: any = createSelector(
    schemaTipoRelatorioSelectors.getNormalizedEntities,
    getTipoRelatorioId,
    schemaTipoRelatorioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTipoRelatorioEditState,
    (state: TipoRelatorioEditState) => state.errors
);
