import * as TramitacaoListActions from '../actions';

export interface TramitacaoListState {
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

export const TramitacaoListInitialState: TramitacaoListState = {
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

export function TramitacaoListReducer(
    state = TramitacaoListInitialState,
    action: TramitacaoListActions.TramitacaoListActionsAll
): TramitacaoListState {
    switch (action.type) {

        case TramitacaoListActions.GET_TRAMITACOES: {
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

        case TramitacaoListActions.GET_TRAMITACOES_SUCCESS: {

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

        case TramitacaoListActions.RELOAD_TRAMITACOES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TramitacaoListActions.GET_TRAMITACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TramitacaoListActions.DELETE_TRAMITACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case TramitacaoListActions.DELETE_TRAMITACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case TramitacaoListActions.DELETE_TRAMITACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
