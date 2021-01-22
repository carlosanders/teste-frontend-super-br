import * as ValidacaoTransicaoWorkflowEditActions from '../actions';

export interface ValidacaoTransicaoWorkflowEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ValidacaoTransicaoWorkflowEditInitialState: ValidacaoTransicaoWorkflowEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
};

export function ValidacaoTransicaoWorkflowEditReducer(
    state = ValidacaoTransicaoWorkflowEditInitialState,
    action: ValidacaoTransicaoWorkflowEditActions.ValidacaoEditActionsAll
): ValidacaoTransicaoWorkflowEditState {
    switch (action.type) {

        case ValidacaoTransicaoWorkflowEditActions.GET_VALIDACAO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case ValidacaoTransicaoWorkflowEditActions.GET_VALIDACAO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ValidacaoTransicaoWorkflowEditActions.CREATE_VALIDACAO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'validacaoTransicaoWorkflowHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ValidacaoTransicaoWorkflowEditActions.GET_VALIDACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ValidacaoTransicaoWorkflowEditActions.SAVE_VALIDACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ValidacaoTransicaoWorkflowEditActions.SAVE_VALIDACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ValidacaoTransicaoWorkflowEditActions.SAVE_VALIDACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ValidacaoTransicaoWorkflowEditActions.RELOAD_VALIDACAO: {
            return {
                entityId: 0, errors: undefined, loaded: undefined, saving: false,
                ...state,
                loading: true,
            };
        }

        default:
            return state;
    }
}
