import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    saving: boolean;
    errors: any;
    loaded: any;
}

export const ProcessoInitialState: ProcessoState = {
    saving: false,
    errors: false,
    loaded: false
};

export function ProcessoReducer(state = ProcessoInitialState, action: ProcessoActions.ProcessoActionsAll): ProcessoState {
    switch (action.type) {

        case ProcessoActions.SAVE_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ProcessoActions.SAVE_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProcessoActions.SAVE_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload.errors
            };
        }

        case ProcessoActions.UNLOAD: {
            return {
                ...ProcessoInitialState
            };
        }

        default:
            return state;
    }
}
