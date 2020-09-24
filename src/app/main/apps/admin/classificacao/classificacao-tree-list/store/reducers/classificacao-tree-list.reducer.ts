import * as ClassificacaoTreeListActions from '../actions';

export interface ClassificacaoTreeListState {
    entitiesId: any;
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
    saving: boolean;
    errors: any;
}

export const ClassificacaoTreeListInitialState: ClassificacaoTreeListState = {
    entitiesId: null,
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
    saving: false,
    errors: false,
};

export function ClassificacaoTreeListReducer(
    state = ClassificacaoTreeListInitialState,
    action: ClassificacaoTreeListActions.ClassificacaoTreeListActionsAll
): ClassificacaoTreeListState {
    switch (action.type) {

        case ClassificacaoTreeListActions.GET_CLASSIFICACAO: {
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

        case ClassificacaoTreeListActions.GET_CLASSIFICACAO_SUCCESS: {
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

        case ClassificacaoTreeListActions.GET_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ClassificacaoTreeListActions.RELOAD_CLASSIFICACAO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ClassificacaoTreeListActions.SAVE_CLASSIFICACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ClassificacaoTreeListActions.SAVE_CLASSIFICACAO_SUCCESS: {
            return {
                ...state,
                loaded: {
                    id: 'classificacaoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false,
            };
        }

        case ClassificacaoTreeListActions.SAVE_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
