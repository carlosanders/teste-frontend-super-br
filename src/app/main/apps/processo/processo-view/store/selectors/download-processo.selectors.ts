import {createSelector} from '@ngrx/store';
import {
    DownloadProcessoState,
    getProcessoViewAppState,
    ProcessoViewAppState
} from 'app/main/apps/processo/processo-view/store/reducers';

export const getDownloadProcessoState: any = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state.downloadProcesso
);

export const getSavingDownloadProcesso: any = createSelector(
    getDownloadProcessoState,
    (state: DownloadProcessoState) => state.saving
);

export const getSavingDownloadProcessoErrors: any = createSelector(
    getDownloadProcessoState,
    (state: DownloadProcessoState) => state.errors
);
