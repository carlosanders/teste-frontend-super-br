import * as TipoAcaoWorkflowEditActions from '../actions/tipo-acao-workflow-edit.actions';

export interface TipoAcaoWorkflowEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TipoAcaoWorkflowEditInitialState: TipoAcaoWorkflowEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TipoAcaoWorkflowEditReducer(
    state = TipoAcaoWorkflowEditInitialState,
    action: TipoAcaoWorkflowEditActions.TipoAcaoWorkflowEditActionsAll
): TipoAcaoWorkflowEditState {
    switch (action.type) {

        case TipoAcaoWorkflowEditActions.GET_TIPO_ACAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TipoAcaoWorkflowEditActions.GET_TIPO_ACAO_WORKFLOW_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoAcaoWorkflowEditActions.CREATE_TIPO_ACAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'tipoAcaoWorkflowHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TipoAcaoWorkflowEditActions.GET_TIPO_ACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TipoAcaoWorkflowEditActions.SAVE_TIPO_ACAO_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TipoAcaoWorkflowEditActions.SAVE_TIPO_ACAO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'tipoAcaoWorkflowHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case TipoAcaoWorkflowEditActions.SAVE_TIPO_ACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TipoAcaoWorkflowEditActions.SAVE_COLABORADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TipoAcaoWorkflowEditActions.SAVE_COLABORADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case TipoAcaoWorkflowEditActions.SAVE_COLABORADOR_FAILED: {
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
