import * as ModalidadeOrgaoCentralListActions from '../actions';

export interface ModalidadeOrgaoCentralListState {
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

export const ModalidadeOrgaoCentralListInitialState: ModalidadeOrgaoCentralListState = {
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

export function ModalidadeOrgaoCentralListReducer(
    state = ModalidadeOrgaoCentralListInitialState,
    action: ModalidadeOrgaoCentralListActions.ModalidadeOrgaoCentralListActionsAll
): ModalidadeOrgaoCentralListState {
    switch (action.type) {

        case ModalidadeOrgaoCentralListActions.GET_MODALIDADE_ORGAO_CENTRAL: {
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

        case ModalidadeOrgaoCentralListActions.GET_MODALIDADE_ORGAO_CENTRAL_SUCCESS: {
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

        case ModalidadeOrgaoCentralListActions.GET_MODALIDADE_ORGAO_CENTRAL_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ModalidadeOrgaoCentralListActions.UNLOAD_MODALIDADE_ORGAO_CENTRAL: {
            return {
                ...ModalidadeOrgaoCentralListInitialState
            };
        }

        case ModalidadeOrgaoCentralListActions.RELOAD_MODALIDADE_ORGAO_CENTRAL: {
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
