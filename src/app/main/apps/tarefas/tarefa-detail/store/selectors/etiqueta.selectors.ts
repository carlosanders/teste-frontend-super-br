import {createSelector} from '@ngrx/store';
import {EtiquetaState, getTarefaDetailAppState, TarefaDetailAppState} from '../reducers';
import {Acao, Etiqueta} from '@cdk/models';
import {etiqueta as etiquetaSchema, acao as acaoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaEtiquetaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);
const schemaAcaoSelectors = createSchemaSelectors<Acao>(acaoSchema);

export const getEtiquetaState: any = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.etiqueta
);

export const getEtiquetaId: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getEtiqueta: any = createSelector(
    schemaEtiquetaSelectors.getNormalizedEntities,
    getEtiquetaId,
    schemaEtiquetaSelectors.entityProjector
);

export const getEtiquetaError: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.errors
);

export const getEtiquetaLoaded: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded
);

export const getEtiquetaIsLoading: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loading
);

export const getAcoesEtiquetaIsLoading: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loadingAcoes
);

export const getAcoesEtiquetaId: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.acoesId
);

export const getAcoesEtiqueta: any = createSelector(
    schemaAcaoSelectors.getNormalizedEntities,
    getAcoesEtiquetaId,
    schemaAcaoSelectors.entitiesProjector
);
