import * as RootSetorActions from '../actions/setor.actions';

export interface RootSetorState {
    unidadeId: number;
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

export const RootSetorInitialState: RootSetorState = {
    entitiesId: [],
    unidadeId: null,
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

export function RootSetorReducer(
    state = RootSetorInitialState,
    action: RootSetorActions.RootSetorActionsAll
): RootSetorState {
    switch (action.type) {

        case RootSetorActions.GET_SETORES: {
            return {
                ...state,
                unidadeId: action.payload.unidadeId,
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

        case RootSetorActions.GET_SETORES_SUCCESS: {
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

        case RootSetorActions.GET_SETORES_FAILED: {
            return {
                ...state,
                unidadeId: null,
                loading: false
            };
        }

        case RootSetorActions.UNLOAD_SETORES: {
            return {
                ...RootSetorInitialState
            };
        }

        default:
            return state;
    }
}
