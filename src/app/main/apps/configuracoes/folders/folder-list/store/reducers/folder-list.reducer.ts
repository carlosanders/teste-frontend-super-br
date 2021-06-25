import * as FolderListActions from '../actions';
import * as _ from 'lodash';

export interface FolderListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    selectedFolderIds: number[];
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
    undeletingFolderIds: number[];
}

export const FolderListInitialState: FolderListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    selectedFolderIds: [],
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {},
    undeletingFolderIds: [],
};

export function FolderListReducer(
    state = FolderListInitialState,
    action: FolderListActions.FolderListActionsAll
): FolderListState {
    switch (action.type) {

        case FolderListActions.GET_FOLDERS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case FolderListActions.GET_FOLDERS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case FolderListActions.UNLOAD_FOLDERS: {
            return {
                ...FolderListInitialState
            };
        }

        case FolderListActions.RELOAD_FOLDERS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case FolderListActions.GET_FOLDERS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FolderListActions.DELETE_FOLDER: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case FolderListActions.DELETE_FOLDER_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case FolderListActions.DELETE_FOLDER_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== parseInt(Object.keys(action.payload)[0])),
                deletingErrors: {
                    ...state.deletingErrors,
                    ...action.payload
                }
            };
        }

        case FolderListActions.UNDELETE_FOLDER: {
            return {
                ...state,
                undeletingFolderIds: [...state.undeletingFolderIds, action.payload.folder.id],
            };
        }

        case FolderListActions.UNDELETE_FOLDER_SUCCESS: {
            return {
                ...state,
                deletedIds: state.deletedIds.filter(id => id !== action.payload.folder.id),
            };
        }

        case FolderListActions.UNDELETE_FOLDER_FAILED: {
            return {
                ...state,
                undeletingFolderIds: state.undeletingFolderIds.filter(id => id !== action.payload.id)
            };
        }

        case FolderListActions.REMOVE_FOLDER: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            const selectedFolderIds = state.selectedFolderIds.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedFolderIds: selectedFolderIds
            };
        }

        default:
            return state;
    }
}
