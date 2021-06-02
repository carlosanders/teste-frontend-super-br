import * as AcaoTransicaoWorkflowEditActions from '../actions';

export interface AcaoTransicaoWorkflowEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AcaoTransicaoWorkflowEditInitialState: AcaoTransicaoWorkflowEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
};

export function AcaoTransicaoWorkflowEditReducer(
    state = AcaoTransicaoWorkflowEditInitialState,
    action: AcaoTransicaoWorkflowEditActions.AcaoEditActionsAll
): AcaoTransicaoWorkflowEditState {
    switch (action.type) {

        case AcaoTransicaoWorkflowEditActions.GET_ACAO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case AcaoTransicaoWorkflowEditActions.GET_ACAO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AcaoTransicaoWorkflowEditActions.CREATE_ACAO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'acaoTransicaoWorkflowHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AcaoTransicaoWorkflowEditActions.GET_ACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AcaoTransicaoWorkflowEditActions.SAVE_ACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AcaoTransicaoWorkflowEditActions.SAVE_ACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AcaoTransicaoWorkflowEditActions.SAVE_ACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case AcaoTransicaoWorkflowEditActions.RELOAD_ACAO: {
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
