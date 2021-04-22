import * as RootLotacaoListActions from '../actions/lotacao.actions';

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
}

export const RootLotacaoListInitialState: RootLotacaoListState = {
    entitiesId: [],
    setorId: null,
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
    loading: false,
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

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false
            };
        }

        case RootLotacaoListActions.RELOAD_LOTACOES: {
            return {
                ...state,
                loading: false
            };
        }

        case RootLotacaoListActions.GET_LOTACOES_FAILED: {
            return {
                ...state,
                setorId: null,
                loading: false
            };
        }

        case RootLotacaoListActions.UNLOAD_LOTACOES: {
            return {
                ...RootLotacaoListInitialState
            };
        }

        default:
            return state;
    }
}
