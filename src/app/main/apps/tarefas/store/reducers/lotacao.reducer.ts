import * as RootLotacaoListActions from '../actions';

export interface RootLotacaoListState {
    setorId: number;
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
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const RootLotacaoListInitialState: RootLotacaoListState = {
    entitiesId: [],
    setorId: 0,
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
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: []
};

export function RootLotacaoListReducer(
    state = RootLotacaoListInitialState,
    action: RootLotacaoListActions.RootLotacaoListActionsAll
): RootLotacaoListState {
    switch (action.type) {

        case RootLotacaoListActions.GET_LOTACOES: {
            return {
                ...state,
                setorId: action.payload.setorId,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    context: action.payload.context,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case RootLotacaoListActions.GET_LOTACOES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                setorId: action.payload.setorId,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case RootLotacaoListActions.RELOAD_LOTACOES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RootLotacaoListActions.GET_LOTACOES_FAILED: {
            return {
                ...state,
                setorId: 0,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
