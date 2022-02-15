import {createSelector} from '@ngrx/store';
import {getProcessoDownloadAppState, ProcessoDownloadAppState, ProcessoDownloadState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoDownloadState: any = createSelector(
    getProcessoDownloadAppState,
    (state: ProcessoDownloadAppState) => state.processoDownload
);

export const getIsSaving: any = createSelector(
    getProcessoDownloadState,
    (state: ProcessoDownloadState) => state.saving
);

export const getErrors: any = createSelector(
    getProcessoDownloadState,
    (state: ProcessoDownloadState) => state.errors
);

