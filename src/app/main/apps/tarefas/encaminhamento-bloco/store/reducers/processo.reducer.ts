import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    saving: boolean;
    errors: any;
    loaded: any;
    encaminhandoProcessosIds: number[];
}

export const ProcessoInitialState: ProcessoState = {
    saving: false,
    errors: false,
    loaded: false,
    encaminhandoProcessosIds: []
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
                errors: false,
                encaminhandoProcessosIds: state.encaminhandoProcessosIds.filter(id => id !== action.payload.id)
            };
        }

        case ProcessoActions.SAVE_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload.errors
            };
        }

        case ProcessoActions.ADD_PROCESSO_ENCAMINHAMENTO: {
            const newState = state.encaminhandoProcessosIds.indexOf(action.payload) === -1 ? [...state.encaminhandoProcessosIds, action.payload] : state.encaminhandoProcessosIds;
            return {
                ...state,
                encaminhandoProcessosIds: newState
            }
        }

        default:
            return state;
    }
}
