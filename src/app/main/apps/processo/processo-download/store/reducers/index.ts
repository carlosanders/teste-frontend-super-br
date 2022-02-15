import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoDownloadReducer, ProcessoDownloadState} from './processo-download.reducer';

export interface ProcessoDownloadAppState
{
    processoDownload: ProcessoDownloadState;
}

export const getProcessoDownloadAppState = createFeatureSelector<ProcessoDownloadAppState>(
    'processo-download-app'
);

export const getAppState: any = createSelector(
    getProcessoDownloadAppState,
    (state: ProcessoDownloadAppState) => state
);

export const reducers: ActionReducerMap<ProcessoDownloadAppState> = {
    processoDownload: ProcessoDownloadReducer
};

export * from './processo-download.reducer';
