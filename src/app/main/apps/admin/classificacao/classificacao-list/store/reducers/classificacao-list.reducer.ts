import * as ClassificacaoListActions from '../actions';

export interface ClassificacaoListState {
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
    deletingErrors: any;
}

export const ClassificacaoListInitialState: ClassificacaoListState = {
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
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function ClassificacaoListReducer(
    state = ClassificacaoListInitialState,
    action: ClassificacaoListActions.ClassificacaoListActionsAll
): ClassificacaoListState {
    switch (action.type) {

        case ClassificacaoListActions.GET_CLASSIFICACAO: {
            return {
                ...state,
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

        case ClassificacaoListActions.GET_CLASSIFICACAO_SUCCESS: {
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

        case ClassificacaoListActions.GET_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ClassificacaoListActions.RELOAD_CLASSIFICACAO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ClassificacaoListActions.DELETE_CLASSIFICACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case ClassificacaoListActions.DELETE_CLASSIFICACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case ClassificacaoListActions.DELETE_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
