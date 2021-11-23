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
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
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
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
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
                deletingIds: [...state.deletingIds, action.payload.folderId]
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
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        default:
            return state;
    }
}
