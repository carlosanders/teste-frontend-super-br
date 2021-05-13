import * as TipoValidacaoWorkflowListActions from '../actions';

export interface TipoValidacaoWorkflowListState {
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

export const TipoValidacaoWorkflowListInitialState: TipoValidacaoWorkflowListState = {
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

export function TipoValidacaoWorkflowListReducer(
    state = TipoValidacaoWorkflowListInitialState,
    action: TipoValidacaoWorkflowListActions.TipoValidacaoWorkflowListActionsAll
): TipoValidacaoWorkflowListState {
    switch (action.type) {

        case TipoValidacaoWorkflowListActions.GET_TIPO_VALIDACAO_WORKFLOW: {
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

        case TipoValidacaoWorkflowListActions.GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS: {
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

        case TipoValidacaoWorkflowListActions.GET_TIPO_VALIDACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TipoValidacaoWorkflowListActions.RELOAD_TIPO_VALIDACAO_WORKFLOW: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TipoValidacaoWorkflowListActions.DELETE_TIPO_VALIDACAO_WORKFLOW: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case TipoValidacaoWorkflowListActions.DELETE_TIPO_VALIDACAO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case TipoValidacaoWorkflowListActions.DELETE_TIPO_VALIDACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
