import * as PessoaListActions from 'app/main/apps/pessoa/pessoa-list/store/actions';

export interface PessoaListState {
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

export const PessoaListInitialState: PessoaListState = {
    entitiesId: [],
    pagination: {
        limit: 10,
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

export function PessoaListReducer(state = PessoaListInitialState, action: PessoaListActions.PessoaListActionsAll): PessoaListState {
    switch (action.type) {

        case PessoaListActions.GET_PESSOAS: {
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

        case PessoaListActions.GET_PESSOAS_SUCCESS: {

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

        case PessoaListActions.RELOAD_PESSOAS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case PessoaListActions.GET_PESSOAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case PessoaListActions.DELETE_PESSOA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case PessoaListActions.DELETE_PESSOA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case PessoaListActions.DELETE_PESSOA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
