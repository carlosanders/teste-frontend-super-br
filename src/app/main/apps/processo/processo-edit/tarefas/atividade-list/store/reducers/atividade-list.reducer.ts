import * as AtividadeListActions from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store/actions';

export interface AtividadeListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
}

export const AtividadeListInitialState: AtividadeListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
};

export function AtividadeListReducer(state = AtividadeListInitialState, action: AtividadeListActions.AtividadeListActionsAll): AtividadeListState {
    switch (action.type) {

        case AtividadeListActions.GET_ATIVIDADES: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case AtividadeListActions.GET_ATIVIDADES_SUCCESS: {

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

        case AtividadeListActions.GET_ATIVIDADES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
