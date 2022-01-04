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

export const getTarefas: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.tarefas
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

export const getUndeletingDocumentosId: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.undeletingDocumentoIds
);

export const getLixeiraMinutas: any = createSelector(
    getMinutasState,
    (state: MinutasState) => state.lixeira
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

export const getTarefaStateById = (tarefaId: number): MemoizedSelector<any, any> => createSelector(
    getTarefas,
    tarefas => tarefas[tarefaId]
);

export const getPaginationTarefaId = (tarefaId: number): MemoizedSelector<any, any> => createSelector(
    getTarefas,
    tarefas => tarefas[tarefaId].pagination
);

export const getDocumentosIdByTarefaId = (tarefaId: number): MemoizedSelector<any, any> => createSelector(
    getTarefas,
    tarefas => tarefas[tarefaId].documentosId
);

export const getLoadedTarefaId = (tarefaId: number): MemoizedSelector<any, any> => createSelector(
    getTarefas,
    tarefas => tarefas[tarefaId].loaded
);

export const getLoadingTarefaId = (tarefaId: number): MemoizedSelector<any, any> => createSelector(
    getTarefas,
    tarefas => tarefas[tarefaId].loading
);

export const isLoadingAny: any = createSelector(
    getTarefas,
    (tarefas) => {
        let loading = false;
        const hasLoading = Object.values(tarefas).filter(tarefa => tarefa.loading);
        if (hasLoading.length > 0) {
            loading = true;
        }
        return loading;
    }
);

export const hasLoadedAll: any = createSelector(
    getTarefas,
    (tarefas) => {
        let loaded = true;
        const hasLoaded = Object.values(tarefas).filter(tarefa => !tarefa.loaded);
        if (hasLoaded.length > 0) {
            loaded = false;
        }
        return loaded;
    }
);

export const getDocumentosByTarefaId = (tarefaId: number): any => createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosIdByTarefaId(tarefaId),
    schemaDocumentoSelectors.entitiesProjector
);
