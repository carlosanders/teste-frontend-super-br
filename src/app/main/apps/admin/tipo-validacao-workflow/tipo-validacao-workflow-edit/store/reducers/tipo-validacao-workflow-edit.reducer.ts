import * as TipoValidacaoWorkflowEditActions from '../actions/tipo-validacao-workflow-edit.actions';

export interface TipoValidacaoWorkflowEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TipoValidacaoWorkflowEditInitialState: TipoValidacaoWorkflowEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TipoValidacaoWorkflowEditReducer(
    state = TipoValidacaoWorkflowEditInitialState,
    action: TipoValidacaoWorkflowEditActions.TipoValidacaoWorkflowEditActionsAll
): TipoValidacaoWorkflowEditState {
    switch (action.type) {

        case TipoValidacaoWorkflowEditActions.GET_TIPO_VALIDACAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TipoValidacaoWorkflowEditActions.GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoValidacaoWorkflowEditActions.CREATE_TIPO_VALIDACAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'tipoValidacaoWorkflowHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TipoValidacaoWorkflowEditActions.GET_TIPO_VALIDACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TipoValidacaoWorkflowEditActions.SAVE_TIPO_VALIDACAO_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TipoValidacaoWorkflowEditActions.SAVE_TIPO_VALIDACAO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'tipoValidacaoWorkflowHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case TipoValidacaoWorkflowEditActions.SAVE_TIPO_VALIDACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TipoValidacaoWorkflowEditActions.SAVE_COLABORADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TipoValidacaoWorkflowEditActions.SAVE_COLABORADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case TipoValidacaoWorkflowEditActions.SAVE_COLABORADOR_FAILED: {
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
