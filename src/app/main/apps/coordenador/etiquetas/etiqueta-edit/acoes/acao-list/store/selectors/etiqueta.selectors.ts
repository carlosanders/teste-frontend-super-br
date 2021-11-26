import {createSelector} from '@ngrx/store';
import {AcaoListAppState, EtiquetaState, getAcaoListAppState} from '../reducers';
import {Etiqueta} from '@cdk/models';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaEtiquetaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);

export const getEtiquetaState: any = createSelector(
    getAcaoListAppState,
    (state: AcaoListAppState) => state.etiqueta
);

export const getEtiquetaId: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded ? state.loaded.value : null
);

export const getEtiqueta: any = createSelector(
    schemaEtiquetaSelectors.getNormalizedEntities,
    getEtiquetaId,
    schemaEtiquetaSelectors.entityProjector
);

export const getEtiquetaLoaded: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded
);

export const getEtiquetaIsLoading: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loading
);
