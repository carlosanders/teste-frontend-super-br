import * as TipoValidacaoWorkflowActions from '../actions/tipo-validacao-workflow.actions';

export interface TipoValidacaoWorkflowState {
    entitiesId: number[];
    loading: boolean;
    loaded: any;
}

export const TipoValidacaoWorkflowInitialState: TipoValidacaoWorkflowState = {
    entitiesId: [],
    loading: false,
    loaded: false
};

export function TipoValidacaoWorkflowReducer(
    state = TipoValidacaoWorkflowInitialState,
    action: TipoValidacaoWorkflowActions.TipoValidacaoWorkflowActionsAll
): TipoValidacaoWorkflowState {
    switch (action.type) {

        case TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW: {
            return {
                ...state,
                loading: true,
            };
        }

        case TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
