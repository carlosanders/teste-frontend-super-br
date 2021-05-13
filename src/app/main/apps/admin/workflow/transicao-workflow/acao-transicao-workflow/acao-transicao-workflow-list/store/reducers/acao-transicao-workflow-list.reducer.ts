import * as AcaoTransicaoWorkflowListActions from '../actions';

export interface AcaoTransicaoWorkflowListState {
    entitiesId: number[];
    transicaoWorkflowId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const AcaoTransicaoWorkflowListInitialState: AcaoTransicaoWorkflowListState = {
    entitiesId: [],
    transicaoWorkflowId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function AcaoTransicaoWorkflowListReducer(
    state = AcaoTransicaoWorkflowListInitialState,
    action: AcaoTransicaoWorkflowListActions.AcaoListActionsAll
): AcaoTransicaoWorkflowListState {
    switch (action.type) {

        case AcaoTransicaoWorkflowListActions.GET_ACOES: {
            return {
                ...state,
                loading: true,
                transicaoWorkflowId: action.payload
            };
        }

        case AcaoTransicaoWorkflowListActions.GET_ACOES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case AcaoTransicaoWorkflowListActions.RELOAD_ACOES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AcaoTransicaoWorkflowListActions.GET_ACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AcaoTransicaoWorkflowListActions.DELETE_ACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.acaoId]
            };
        }

        case AcaoTransicaoWorkflowListActions.DELETE_ACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case AcaoTransicaoWorkflowListActions.DELETE_ACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
