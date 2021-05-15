import * as FoldersActions from 'app/main/apps/tarefas/store/actions/folders.actions';

export interface FoldersState
{
    folderId: number;
    saving: boolean;
    errors: any;
    entitiesId: number[];
    loading: boolean;
    loaded: boolean;
    deletingIds: number[];
    deletedIds: number[];
}

export const FoldersInitialState: FoldersState = {
    folderId: null,
    saving: false,
    errors: false,
    entitiesId: [],
    loading : false,
    loaded  : false,
    deletingIds: [],
    deletedIds: []
};

export function FoldersReducer(state = FoldersInitialState, action: FoldersActions.FoldersActionsAll): FoldersState
{
    switch ( action.type )
    {
        case FoldersActions.GET_FOLDERS: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case FoldersActions.GET_FOLDERS_SUCCESS: {
            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded: action.payload.loaded
            };
        }

        case FoldersActions.GET_FOLDERS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FoldersActions.SAVE_FOLDER: {
            return {
                ...state,
                saving: true,
                errors: false,
                loaded: false,
                loading: true
            };
        }

        case FoldersActions.SAVE_FOLDER_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                loaded: true,
                loading: false
            };
        }

        case FoldersActions.SAVE_FOLDER_FAILED: {
            return {
                ...state,
                errors: action.payload,
                loaded: false,
                loading: false
            };
        }

        case FoldersActions.RELOAD_FOLDERS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FoldersActions.DELETE_FOLDER: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case FoldersActions.DELETE_FOLDER_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case FoldersActions.DELETE_FOLDER_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
