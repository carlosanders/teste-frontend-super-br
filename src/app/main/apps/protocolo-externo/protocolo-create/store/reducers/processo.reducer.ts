import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    processoId: number;
    loading: boolean;
    loaded: any;
    restricaoProcesso: boolean;
}

export const ProcessoInitialState: ProcessoState = {
    processoId: null,
    loading: false,
    loaded: false,
    restricaoProcesso: false
};

export function ProcessoReducer(state = ProcessoInitialState, action: ProcessoActions.ProcessoActionsAll): ProcessoState {
    switch (action.type) {

        case ProcessoActions.GET_PROCESSO: {
            return {
                processoId: null,
                loaded: false,
                loading: true,
                restricaoProcesso: false
            };
        }

        case ProcessoActions.GET_PROCESSO_SUCCESS: {

            return {
                processoId: action.payload.processoId,
                loading: false,
                loaded: action.payload.loaded,
                restricaoProcesso: false
            };
        }

        case ProcessoActions.GET_PROCESSO_FAILED: {
            return {
                processoId: null,
                loading: false,
                loaded: false,
                restricaoProcesso: false
            };
        }

        case ProcessoActions.GET_VISIBILIDADES_PROCESSO_TAREFA: {
            return {
                ...state,
                loading: true,
                processoId: action.payload
            };
        }

        case ProcessoActions.GET_VISIBILIDADES_PROCESSO_TAREFA_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                restricaoProcesso: action.payload.restricaoProcesso,
                loading: false,
                loaded
            };
        }

        case ProcessoActions.GET_VISIBILIDADES_PROCESSO_TAREFA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ProcessoActions.UNLOAD_PROCESSO: {
            return {
                ...ProcessoInitialState
            };
        }

        default:
            return state;
    }
}
