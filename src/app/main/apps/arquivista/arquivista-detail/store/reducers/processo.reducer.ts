import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    expandir: boolean;
    saving: boolean;
    errors: any;
}

export const ProcessoInitialState: ProcessoState = {
    expandir: false,
    saving: false,
    errors: false,
};

export function ProcessoReducer(state = ProcessoInitialState, action: ProcessoActions.ProcessoActionsAll): ProcessoState {
    switch (action.type) {

        case ProcessoActions.EXPANDIR_TELA: {
            return {
                ...state,
                expandir: action.payload
            };
        }

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
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
