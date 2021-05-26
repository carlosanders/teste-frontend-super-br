import * as PessoaListActions from '../actions';

export interface PessoaListState {
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

export const PessoaListInitialState: PessoaListState = {
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

export function AdminPessoaListReducer(
    state = PessoaListInitialState,
    action: PessoaListActions.PessoaListActionsAll
): PessoaListState {
    switch (action.type) {

        case PessoaListActions.GET_PESSOA: {
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

        case PessoaListActions.GET_PESSOA_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case PessoaListActions.GET_PESSOA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case PessoaListActions.UNLOAD_PESSOA: {
            return {
                ...PessoaListInitialState
            };
        }


        case PessoaListActions.RELOAD_PESSOA: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
