import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {FolderListReducer, FolderListState} from './folder-list.reducer';

export interface FolderListAppState
{
    folderList: FolderListState;
}

export const getFolderListAppState = createFeatureSelector<FolderListAppState>(
    'folder-list-app'
);

export const getAppState: any = createSelector(
    getFolderListAppState,
    (state: FolderListAppState) => state
);

export const reducers: ActionReducerMap<FolderListAppState> = {
    folderList: FolderListReducer
};

export * from './folder-list.reducer';
