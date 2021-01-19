import * as ValidacaoTransicaoWorkflowListActions from '../actions';

export interface ValidacaoTransicaoWorkflowListState {
    entitiesId: number[];
    transicaoWorkflowId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const ValidacaoTransicaoWorkflowListInitialState: ValidacaoTransicaoWorkflowListState = {
    entitiesId: [],
    transicaoWorkflowId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: []
};

export function ValidacaoTransicaoWorkflowListReducer(
    state = ValidacaoTransicaoWorkflowListInitialState,
    action: ValidacaoTransicaoWorkflowListActions.ValidacaoListActionsAll
): ValidacaoTransicaoWorkflowListState {
    switch (action.type) {

        case ValidacaoTransicaoWorkflowListActions.GET_VALIDACOES: {
            return {
                ...state,
                loading: true,
                transicaoWorkflowId: action.payload
            };
        }

        case ValidacaoTransicaoWorkflowListActions.GET_VALIDACOES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case ValidacaoTransicaoWorkflowListActions.RELOAD_VALIDACOES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ValidacaoTransicaoWorkflowListActions.GET_VALIDACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ValidacaoTransicaoWorkflowListActions.DELETE_VALIDACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.validacaoId]
            };
        }

        case ValidacaoTransicaoWorkflowListActions.DELETE_VALIDACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case ValidacaoTransicaoWorkflowListActions.DELETE_VALIDACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
