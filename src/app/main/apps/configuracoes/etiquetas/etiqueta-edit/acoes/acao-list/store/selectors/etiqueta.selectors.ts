import {createSelector} from '@ngrx/store';
import {getAcaoListAppState, AcaoListAppState, EtiquetaState} from '../reducers';
import {Etiqueta} from '@cdk/models';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaEtiquetaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);

export const getEtiquetaState = createSelector(
    getAcaoListAppState,
    (state: AcaoListAppState) => state.etiqueta
);

export const getEtiquetaId = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded ? state.loaded.value : null
);

export const getEtiqueta = createSelector(
    schemaEtiquetaSelectors.getNormalizedEntities,
    getEtiquetaId,
    schemaEtiquetaSelectors.entityProjector
);

export const getEtiquetaLoaded = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded
);

export const getEtiquetaIsLoading = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loading
);
