import * as TipoAcaoWorkflowActions from '../actions/tipo-acao-workflow.actions';

export interface TipoAcaoWorkflowState {
    entitiesId: number[];
    loading: boolean;
    loaded: any;
}

export const TipoAcaoWorkflowInitialState: TipoAcaoWorkflowState = {
    entitiesId: [],
    loading: false,
    loaded: false
};

export function TipoAcaoWorkflowReducer(
    state = TipoAcaoWorkflowInitialState,
    action: TipoAcaoWorkflowActions.TipoAcaoWorkflowActionsAll
): TipoAcaoWorkflowState {
    switch (action.type) {

        case TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW: {
            return {
                ...state,
                loading: true,
            };
        }

        case TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW_FAILED: {
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
