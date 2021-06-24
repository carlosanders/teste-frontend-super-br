import * as FoldersActions from '../actions/folders.actions';

export interface FoldersState
{
    entitiesId: number[];
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: boolean;
    deletingIds: number[];
    deletedIds: number[];
    foldersWaitingReload: string[];
}

export const FoldersInitialState: FoldersState = {
    entitiesId: [],
    saving: false,
    errors: false,
    loading : false,
    loaded  : false,
    deletingIds: [],
    deletedIds: [],
    foldersWaitingReload: []
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
                entitiesId: [
                    ...state.entitiesId,
                    action.payload.id
                ],
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
                loading: false,
                saving: false
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
                entitiesId: state.entitiesId.filter(id => id !== action.payload),
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

        case FoldersActions.ADD_FOLDER_WAITING_RELOAD: {
            return {
                ...state,
                foldersWaitingReload: [
                    ...state.foldersWaitingReload.filter(folderName => folderName !== action.payload),
                    action.payload
                ]
            };
        }

        case FoldersActions.REMOVE_FOLDER_WAITING_RELOAD: {
            return {
                ...state,
                foldersWaitingReload: state.foldersWaitingReload.filter(folderName => folderName !== action.payload)
            };
        }

        default:
            return state;
    }
}
