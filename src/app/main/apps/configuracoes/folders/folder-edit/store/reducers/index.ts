import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {FolderEditReducer, FolderEditState} from './folder-edit.reducer';

export interface FolderEditAppState
{
    folder: FolderEditState;
}

export const getFolderEditAppState = createFeatureSelector<FolderEditAppState>(
    'folder-edit-app'
);

export const getAppState: any = createSelector(
    getFolderEditAppState,
    (state: FolderEditAppState) => state
);

export const reducers: ActionReducerMap<FolderEditAppState> = {
    folder: FolderEditReducer
};

export * from './folder-edit.reducer';
