import * as EnderecoListActions from '../actions';
import * as _ from 'lodash';

export interface EnderecoListState {
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

export const EnderecoListInitialState: EnderecoListState = {
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

export function EnderecoListReducer(
    state = EnderecoListInitialState,
    action: EnderecoListActions.EnderecoListActionsAll
): EnderecoListState {
    switch (action.type) {

        case EnderecoListActions.GET_ENDERECOS: {
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

        case EnderecoListActions.GET_ENDERECOS_SUCCESS: {

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

        case EnderecoListActions.RELOAD_ENDERECOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case EnderecoListActions.GET_ENDERECOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EnderecoListActions.DELETE_ENDERECO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.enderecoId]
            };
        }

        case EnderecoListActions.DELETE_ENDERECO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case EnderecoListActions.DELETE_ENDERECO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        default:
            return state;
    }
}
