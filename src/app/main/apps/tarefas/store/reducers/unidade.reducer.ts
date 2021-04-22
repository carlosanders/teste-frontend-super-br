import * as RootUnidadeActions from '../actions/unidade.actions';

export interface RootUnidadeState {
    orgaoCentralId: number;
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

export const RootUnidadeInitialState: RootUnidadeState = {
    entitiesId: [],
    orgaoCentralId: null,
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

export function RootUnidadeReducer(
    state = RootUnidadeInitialState,
    action: RootUnidadeActions.RootUnidadeActionsAll
): RootUnidadeState {
    switch (action.type) {

        case RootUnidadeActions.GET_UNIDADES: {
            return {
                ...state,
                orgaoCentralId: action.payload.orgaoCentralId,
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

        case RootUnidadeActions.GET_UNIDADES_SUCCESS: {
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

        case RootUnidadeActions.GET_UNIDADES_FAILED: {
            return {
                ...state,
                orgaoCentralId: null,
                loading: false
            };
        }

        case RootUnidadeActions.UNLOAD_UNIDADES: {
            return {
                ...RootUnidadeInitialState
            };
        }

        default:
            return state;
    }
}
