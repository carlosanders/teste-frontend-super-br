import {createSelector} from '@ngrx/store';
import {
    RemeterOficiosBlocoAppState,
    RemeterOficiosBlocoState,
    getRemeterOficiosBlocoAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getRemeterOficiosBlocoState: any = createSelector(
    getRemeterOficiosBlocoAppState,
    (state: RemeterOficiosBlocoAppState) => state.remeterOficiosBloco
);

export const getRemeterIds: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.remeterIds
);

export const getIds: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.entitiesId
);

export const getDocumentosAvulso: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getSelectedIds: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.selectedIds
);

export const getTarefaGroup: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => state.tarefaGroup
);

export const getAnyLoading: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => {
        const tarefasGroup = Object.values(state.tarefaGroup);
        return tarefasGroup.filter((group) => group.loading === true).length > 0
    }
);

export const getAllLoaded: any = createSelector(
    getRemeterOficiosBlocoState,
    (state: RemeterOficiosBlocoState) => {
        const tarefasGroup = Object.values(state.tarefaGroup);
        const notLoaded = tarefasGroup.filter((group) => group.loaded === false);
        return tarefasGroup.length > 0 && notLoaded.length === 0
    }
);

