import {createSelector} from '@ngrx/store';
import {getCaixaEmailAppState, CaixaEmailAppState, FolderState} from '../reducers';

export const getFolderState: any = createSelector(
    getCaixaEmailAppState,
    (state: CaixaEmailAppState) => state.folder
);

export const getSelectedFolder: any = createSelector(
    getFolderState,
    (state: FolderState) => state.selectedFolder
);

export const getFolderList: any = createSelector(
    getFolderState,
    (state: FolderState) => state.folders
);

export const getFolderIsLoading: any = createSelector(
    getFolderState,
    (state: FolderState) => state.loading
);

export const getFolderIsLoaded: any = createSelector(
    getFolderState,
    (state: FolderState) => state.loaded
);

export const getFolderError: any = createSelector(
    getFolderState,
    (state: FolderState) => state.error
);
