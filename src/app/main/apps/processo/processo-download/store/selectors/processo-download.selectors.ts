import {createSelector} from '@ngrx/store';
import {
    getProcessoDownloadAppState,
    ProcessoDownloadAppState,
    ProcessoDownloadState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {Processo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoDownloadState = createSelector(
    getProcessoDownloadAppState,
    (state: ProcessoDownloadAppState) => state.processoDownload
);

export const getIsSaving = createSelector(
    getProcessoDownloadState,
    (state: ProcessoDownloadState) => state.saving
);

