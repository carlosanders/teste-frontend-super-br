import * as RelacionamentoListActions from '../actions';

export interface RelacionamentoListState {
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
}

export const RelacionamentoListInitialState: RelacionamentoListState = {
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
    deletingIds: []
};

export function RelacionamentoListReducer(
    state = RelacionamentoListInitialState,
    action: RelacionamentoListActions.RelacionamentoListActionsAll
): RelacionamentoListState {
    switch (action.type) {

        case RelacionamentoListActions.GET_RELACIONAMENTOS: {
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

        case RelacionamentoListActions.GET_RELACIONAMENTOS_SUCCESS: {

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

        case RelacionamentoListActions.RELOAD_RELACIONAMENTOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RelacionamentoListActions.GET_RELACIONAMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RelacionamentoListActions.DELETE_RELACIONAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case RelacionamentoListActions.DELETE_RELACIONAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case RelacionamentoListActions.DELETE_RELACIONAMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
