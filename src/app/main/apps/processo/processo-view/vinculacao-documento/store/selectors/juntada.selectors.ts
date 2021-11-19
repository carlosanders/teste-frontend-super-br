import {createSelector, MemoizedSelector} from '@ngrx/store';
import {
    getProcessoViewVinculacaoDocumentoAppState,
    ProcessoViewVinculacaoDocumentoAppState,
    ProcessoViewVinculacaoDocumentoState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getProcessoViewVinculacaoDocumentoState = createSelector(
    getProcessoViewVinculacaoDocumentoAppState,
    (state: ProcessoViewVinculacaoDocumentoAppState) => state.juntada
);

export const getJuntadaId = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loaded ? state.loaded.value : null
);

export const getJuntadaVinculadaId = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loadedVinculada ? state.loadedVinculada.value : null
);

export const getJuntadaFromStore = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaSelectors.entityProjector
);

export const getJuntada = createSelector(
    getJuntadaFromStore,
    (juntada: Juntada) => {
        const novaJuntada = new Juntada();
        novaJuntada.id = juntada.id;
        novaJuntada.numeracaoSequencial = juntada.numeracaoSequencial;
        juntada.documento.juntadaAtual = {...novaJuntada};
        return juntada;
    }
);

export const getJuntadaVinculadaFromStore = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaVinculadaId,
    schemaSelectors.entityProjector
);

export const getJuntadaVinculada = createSelector(
    getJuntadaVinculadaFromStore,
    (juntada: Juntada) => {
        const novaJuntada = new Juntada();
        novaJuntada.id = juntada.id;
        novaJuntada.numeracaoSequencial = juntada.numeracaoSequencial;
        juntada.documento.juntadaAtual = {...novaJuntada};
        return juntada;
    }
);

export const getAllJuntadas = createSelector(
    schemaSelectors.getNormalizedEntities,
    schemaSelectors.entitiesProjector
);

export const getJuntadaByDocumentoVinculadoId = (documentoId: number): MemoizedSelector<any, any> => createSelector(
    getAllJuntadas,
    (juntadas: Juntada[]) => juntadas?.find(juntada => juntada.documento?.id === documentoId)
);

export const getIsSaving = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.saving
);

export const getHasLoaded = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loaded
);

export const getHasLoadedVinculada = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loadedVinculada
);

export const getErrors = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.errors
);
