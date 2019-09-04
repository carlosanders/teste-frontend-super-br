import * as AssinaturaListActions from '../actions';

export interface AssinaturaListState {
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
}

export const AssinaturaListInitialState: AssinaturaListState = {
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
    loaded: false
};

export function AssinaturaListReducer(state = AssinaturaListInitialState, action: AssinaturaListActions.AssinaturaListActionsAll): AssinaturaListState {
    switch (action.type) {

        case AssinaturaListActions.GET_ASSINATURAS: {
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

        case AssinaturaListActions.GET_ASSINATURAS_SUCCESS: {

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

        case AssinaturaListActions.RELOAD_ASSINATURAS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssinaturaListActions.GET_ASSINATURAS_FAILED: {
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
