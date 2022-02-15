import {createSelector} from '@ngrx/store';
import {getTipoDocumentoEditAppState, TipoDocumentoEditAppState, TipoDocumentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoDocumento} from '@cdk/models';
import {tipoDocumento as tipoDocumentoSchema} from '@cdk/normalizr';

const schemaTipoDocumentoSelectors = createSchemaSelectors<TipoDocumento>(tipoDocumentoSchema);

export const getTipoDocumentoEditState: any = createSelector(
    getTipoDocumentoEditAppState,
    (state: TipoDocumentoEditAppState) => state.tipoDocumento
);

export const getTipoDocumentoId: any = createSelector(
    getTipoDocumentoEditState,
    (state: TipoDocumentoEditState) => state.entityId
);

export const getTipoDocumento: any = createSelector(
    schemaTipoDocumentoSelectors.getNormalizedEntities,
    getTipoDocumentoId,
    schemaTipoDocumentoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTipoDocumentoEditState,
    (state: TipoDocumentoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTipoDocumentoEditState,
    (state: TipoDocumentoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTipoDocumentoEditState,
    (state: TipoDocumentoEditState) => state.errors
);
