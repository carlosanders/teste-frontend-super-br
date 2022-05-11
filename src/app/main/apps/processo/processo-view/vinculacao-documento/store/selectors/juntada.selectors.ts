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

export const getProcessoViewVinculacaoDocumentoState: any = createSelector(
    getProcessoViewVinculacaoDocumentoAppState,
    (state: ProcessoViewVinculacaoDocumentoAppState) => state.juntada
);

export const getJuntadaId: any = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loaded ? state.loaded.value : null
);

export const getJuntadaVinculadaId: any = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loadedVinculada ? state.loadedVinculada.value : null
);

export const getJuntadaFromStore: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaSelectors.entityProjector
);

export const getJuntada: any = createSelector(
    getJuntadaFromStore,
    (juntada: Juntada) => {
        const novaJuntada = new Juntada();
        novaJuntada.id = juntada?.id;
        novaJuntada.numeracaoSequencial = juntada?.numeracaoSequencial;
        juntada.documento.juntadaAtual = {...novaJuntada};
        return juntada;
    }
);

export const getJuntadaVinculadaFromStore: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaVinculadaId,
    schemaSelectors.entityProjector
);

export const getJuntadaVinculada: any = createSelector(
    getJuntadaVinculadaFromStore,
    (juntada: Juntada) => {
        if (juntada) {
            const novaJuntada = new Juntada();
            novaJuntada.id = juntada?.id;
            novaJuntada.numeracaoSequencial = juntada?.numeracaoSequencial;
            juntada.documento.juntadaAtual = {...novaJuntada};
        }
        return juntada;
    }
);

export const getAllJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    schemaSelectors.entitiesProjector
);

export const getJuntadaByDocumentoVinculadoId = (documentoId: number): MemoizedSelector<any, any> => createSelector(
    getAllJuntadas,
    (juntadas: Juntada[]) => juntadas?.find(juntada => juntada.documento?.id === documentoId)
);

export const getIsSaving: any = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loaded
);

export const getHasLoadedVinculada: any = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loadedVinculada
);

export const getErrors: any = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.errors
);
