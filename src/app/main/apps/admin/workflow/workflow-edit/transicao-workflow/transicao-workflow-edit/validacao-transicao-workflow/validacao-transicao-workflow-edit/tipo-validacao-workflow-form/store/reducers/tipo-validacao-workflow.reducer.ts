import * as TipoValidacaoWorkflowActions from '../actions/tipo-validacao-workflow.actions';

export interface TipoValidacaoWorkflowState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TipoValidacaoWorkflowtInitialState: TipoValidacaoWorkflowState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TipoValidacaoWorkflowReducer(
    state = TipoValidacaoWorkflowtInitialState,
    action: TipoValidacaoWorkflowActions.GetTipoWorkflowActionsAll
): TipoValidacaoWorkflowState {
    switch (action.type) {

        case TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loading: true,
                loaded: false
            };
        }

        case TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
