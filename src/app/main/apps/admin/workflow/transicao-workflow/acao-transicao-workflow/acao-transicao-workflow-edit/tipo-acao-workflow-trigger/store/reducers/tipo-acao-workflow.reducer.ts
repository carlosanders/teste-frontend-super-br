import * as TipoAcaoWorkflowActions from '../actions/tipo-acao-workflow.actions';

export interface TipoAcaoWorkflowState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TipoAcaoWorkflowtInitialState: TipoAcaoWorkflowState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TipoAcaoWorkflowReducer(
    state = TipoAcaoWorkflowtInitialState,
    action: TipoAcaoWorkflowActions.GetTipoWorkflowActionsAll
): TipoAcaoWorkflowState {
    switch (action.type) {

        case TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW: {
            console.log('state', {
                ...state,
                entityId: null,
                loading: true,
                loaded: false
            })
            return {
                ...state,
                entityId: null,
                loading: true,
                loaded: false
            };
        }

        case TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
