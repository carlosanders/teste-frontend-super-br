import * as BookmarksActions from 'app/main/apps/processo/processo-view/store/actions/bookmark.actions';

export interface BookmarksState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    selectedBookmark: any;
    saving: boolean;
    errors: any;
    deletingBookmarksIds: number[];
}

export const bookmarkInitialState: BookmarksState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    selectedBookmark: false,
    saving: false,
    errors: false,
    deletingBookmarksIds: []
};

export const bookmarkReducer = (state = bookmarkInitialState, action: BookmarksActions.BookmarksActionsAll): BookmarksState => {
    switch (action.type) {

        case BookmarksActions.GET_BOOKMARKS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.params.limit,
                    offset: action.payload.params.offset,
                    filter: action.payload.params.filter,
                    listFilter: action.payload.params.listFilter,
                    populate: action.payload.params.populate,
                    sort: action.payload.params.sort,
                    total: state.pagination.total
                }
            };
        }

        case BookmarksActions.GET_BOOKMARKS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case BookmarksActions.GET_BOOKMARKS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case BookmarksActions.SAVE_BOOKMARK: {
            return {
                ...state,
                saving: true,
                loading: true,
                loaded: false
            };
        }

        case BookmarksActions.SAVE_BOOKMARK_SUCCESS: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                saving: false,
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case BookmarksActions.SAVE_BOOKMARK_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                loading: false
            };
        }


        case BookmarksActions.DELETE_BOOKMARK: {
            return {
                ...state,
                deletingBookmarksIds: [...state.deletingBookmarksIds, action.payload.bookmarkId]
            };
        }

        case BookmarksActions.DELETE_BOOKMARK_SUCCESS: {
            return {
                ...state,
                deletingBookmarksIds: state.deletingBookmarksIds.filter(id => id !== action.payload),
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case BookmarksActions.DELETE_BOOKMARK_FAILED: {
            return {
                ...state,
                deletingBookmarksIds: state.deletingBookmarksIds.filter(id => id !== action.payload.id),
            };
        }

        case BookmarksActions.RELOAD_BOOKMARKS: {
            return {
                ...state,
                entitiesId: [],
                pagination: {
                    ...state.pagination,
                    limit: 25,
                    offset: 0,
                    total: 0
                }
            };
        }

        default:
            return state;
    }
};
