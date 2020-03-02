import * as FolderEditActions from '../actions/folder-edit.actions';

export interface FolderEditState {
    folderId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const FolderEditInitialState: FolderEditState = {
    folderId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function FolderEditReducer(
    state = FolderEditInitialState,
    action: FolderEditActions.FolderEditActionsAll
): FolderEditState {
    switch (action.type) {

        case FolderEditActions.GET_FOLDER: {
            return {
                ...state,
                folderId: null,
                loading: true
            };
        }

        case FolderEditActions.GET_FOLDER_SUCCESS: {

            return {
                ...state,
                folderId: action.payload.folderId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case FolderEditActions.CREATE_FOLDER: {
            return {
                ...state,
                folderId: null,
                loaded: {
                    id: 'targetHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case FolderEditActions.GET_FOLDER_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case FolderEditActions.SAVE_FOLDER: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case FolderEditActions.SAVE_FOLDER_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case FolderEditActions.SAVE_FOLDER_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
