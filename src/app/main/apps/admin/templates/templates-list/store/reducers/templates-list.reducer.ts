import * as TemplatesListActions from '../actions';

export interface TemplatesListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
        context: any;
    };
    loading: boolean;
    loaded: any;
}

export const TemplatesListInitialState: TemplatesListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    loading: false,
    loaded: false
};

export function TemplatesListReducer(
    state = TemplatesListInitialState,
    action: TemplatesListActions.TemplatesListActionsAll
): TemplatesListState {
    switch (action.type) {

        case TemplatesListActions.GET_TEMPLATES: {
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
                    total: state.pagination.total,
                    context: action.payload.context
                }
            };
        }

        case TemplatesListActions.GET_TEMPLATES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case TemplatesListActions.UNLOAD_TEMPLATES: {
            return {
                ...TemplatesListInitialState
            };
        }

        case TemplatesListActions.RELOAD_TEMPLATES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TemplatesListActions.GET_TEMPLATES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
