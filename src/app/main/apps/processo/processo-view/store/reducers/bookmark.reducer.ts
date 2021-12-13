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
};

export const bookmarkReducer = (state = bookmarkInitialState, action: BookmarksActions.BookmarksActionsAll): BookmarksState => {
    switch (action.type) {

        case BookmarksActions.GET_BOOKMARK: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case BookmarksActions.GET_BOOKMARK_SUCCESS: {

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

        case BookmarksActions.GET_BOOKMARK_FAILED: {
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

        default:
            return state;
    }
};
