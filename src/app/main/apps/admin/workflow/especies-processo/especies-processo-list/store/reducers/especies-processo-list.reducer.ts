import * as EspecieProcessoListActions from '../actions';

export interface WorkflowEspecieProcessoListState {
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
}

export const EspecieProcessoListInitialState: WorkflowEspecieProcessoListState = {
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
    deletingIds: []
};

export function WorkflowEspeciesProcessoListReducer(
    state = EspecieProcessoListInitialState,
    action: EspecieProcessoListActions.EspeciesProcessoListActionsAll
): WorkflowEspecieProcessoListState {
    switch (action.type) {

        case EspecieProcessoListActions.GET_ESPECIE_PROCESSO: {
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

        case EspecieProcessoListActions.GET_ESPECIE_PROCESSO_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded,
            };
        }

        case EspecieProcessoListActions.GET_ESPECIE_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieProcessoListActions.RELOAD_ESPECIE_PROCESSO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieProcessoListActions.UPDATE_ESPECIE_PROCESSO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.especieProcesso.id]
            };
        }

        case EspecieProcessoListActions.UPDATE_ESPECIE_PROCESSO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case EspecieProcessoListActions.UPDATE_ESPECIE_PROCESSO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
