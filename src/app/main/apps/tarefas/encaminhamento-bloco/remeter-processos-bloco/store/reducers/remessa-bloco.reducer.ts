import * as RemessaBlocoActions from '../actions/remessa-bloco.actions';

export interface RemessaBlocoState {
    savingProcessosId: number[];
    errors: any;
}

export const RemessaBlocoInitialState: RemessaBlocoState = {
    savingProcessosId: [],
    errors: false,
};

export function RemessaBlocoReducer(
    state = RemessaBlocoInitialState,
    action: RemessaBlocoActions.RemessaBlocoActionsAll
): RemessaBlocoState {
    switch (action.type) {

        case RemessaBlocoActions.SAVE_TRAMITACAO: {
            return {
                ...state,
                savingProcessosId: [...state.savingProcessosId, action.payload.tramitacao.processo.id],
                errors: false
            };
        }

        case RemessaBlocoActions.SAVE_TRAMITACAO_SUCCESS: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.tramitacao.processo.id)
            };
        }

        case RemessaBlocoActions.SAVE_TRAMITACAO_FAILED: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.id),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
