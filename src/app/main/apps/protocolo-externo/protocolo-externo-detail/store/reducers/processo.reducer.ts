import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    expandir: boolean;
}

export const ProcessoInitialState: ProcessoState = {
    expandir: false
};

export function ProcessoReducer(state = ProcessoInitialState, action: ProcessoActions.ProcessoActionsAll): ProcessoState {
    switch (action.type) {

        case ProcessoActions.EXPANDIR_TELA: {
            return {
                ...state,
                expandir: action.payload
            };
        }
        default:
            return state;
    }
}
