import {createSelector, MemoizedSelector} from '@ngrx/store';
import {
    MinutasState,
    MinutasAppState,
    getMinutasAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getMinutasState: any = createSelector(
    getMinutasAppState,
    (state: MinutasAppState) => state ? state.minutas : null
);

export const getDocumentosId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.documentos
);

export const getProcessos: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.processos
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.loaded
);

export const getDeletingDocumentosId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.removendoAssinaturaDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.alterandoDocumentoIds
);

export const getConvertendoDocumentosId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentosP7SId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.downloadDocumentosP7SIds
);

export const getSelectedDocumentoIds: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.selectedDocumentosId
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getProcessoStateById = (processoId: number): MemoizedSelector<any, any> => createSelector(
    getProcessos,
    processos => processos[processoId]
);

export const getPaginationProcessoId = (processoId: number): MemoizedSelector<any, any> => createSelector(
    getProcessos,
    processos => processos[processoId].pagination
);

export const getDocumentosIdByProcessoId = (processoId: number): MemoizedSelector<any, any> => createSelector(
    getProcessos,
    processos => processos[processoId].documentos
);

export const getLoadedProcessoId = (processoId: number): MemoizedSelector<any, any> => createSelector(
    getProcessos,
    processos => processos[processoId].loaded
);

export const getLoadingProcessoId = (processoId: number): MemoizedSelector<any, any> => createSelector(
    getProcessos,
    processos => processos[processoId].loading
);

export const isLoadingAny: any = createSelector(
    getProcessos,
    (processos) => {
        let loading = false;
        const hasLoading = Object.values(processos).filter(processo => processo.loading);
        if (hasLoading.length > 0) {
            loading = true;
        }
        return loading;
    }
);

export const hasLoadedAll: any = createSelector(
    getProcessos,
    (processos) => {
        let loaded = true;
        const hasLoaded = Object.values(processos).filter(processo => !processo.loaded);
        if (hasLoaded.length > 0) {
            loaded = false;
        }
        return loaded;
    }
);

export const getDocumentosByProcessoId = (processoId: number): any => createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosIdByProcessoId(processoId),
    schemaDocumentoSelectors.entitiesProjector
);
