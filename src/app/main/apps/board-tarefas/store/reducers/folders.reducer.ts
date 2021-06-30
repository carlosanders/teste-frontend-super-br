import * as FoldersActions from '../actions/folders.actions';

export interface FoldersState
{
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        context: any;
        sort: any;
        total: number;
    };
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: boolean;
    deletingIds: number[];
    deletedIds: number[];
}

export const FoldersInitialState: FoldersState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
    saving: false,
    errors: false,
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

            let entitiesId = [];

            if (action.payload?.increment === true) {
                entitiesId = state.entitiesId;
            }

            return {
                ...state,
                pagination: {
                    filter: action.payload.filter,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    context: action.payload.context,
                    total: state.pagination.total
                },
                loading: true,
                loaded: false
            };
        }

        case FoldersActions.GET_FOLDERS_SUCCESS: {
            return {
                ...state,
                entitiesId: [
                    ...state.entitiesId,
                    ...action.payload.entitiesId
                ],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
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
                pagination: {
                    ...state.pagination,
                    total: (state.pagination.total + 1)
                },
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

        case FoldersActions.DELETE_FOLDER: {
            return {
                ...state,
                entitiesId: state.entitiesId.filter(id => id !== action.payload),
                pagination: {
                    ...state.pagination,
                    total: (state.pagination.total - 1)
                },
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
                entitiesId: [
                    action.payload,
                    ...state.entitiesId.filter(id => id !== action.payload)
                ],
                pagination: {
                    ...state.pagination,
                    total: (state.pagination.total + 1)
                },
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
