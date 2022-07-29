import * as BookmarksActions from '../actions/bookmark.actions';

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
    errors: any;
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
    errors: false,
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
