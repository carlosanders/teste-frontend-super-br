import * as ProcessoCapaActions from '../actions/processo-capa.actions';

export interface ProcessoCapaState {
    processoId: number;
    loading: boolean;
    loadingAssuntos: boolean;
    loadingInteressados: boolean;
    loadingAcompanhamento: boolean;
    loaded: any;
    errors: any;
}

export const ProcessoInitialState: ProcessoCapaState = {
    processoId: null,
    loading: false,
    loadingAssuntos: false,
    loadingInteressados: false,
    loadingAcompanhamento: false,
    loaded: false,
    errors: false
};

export function ProcessoCapaReducer(state = ProcessoInitialState, action: ProcessoCapaActions.ProcessoCapaActionsAll): ProcessoCapaState {
    switch (action.type) {

        case ProcessoCapaActions.GET_PROCESSO: {
            return {
                ...state,
                processoId: null,
                loaded: false,
                loading: true,
                errors: false
            };
        }

        case ProcessoCapaActions.GET_PROCESSO_SUCCESS: {
            return {
                ...state,
                processoId: action.payload.processoId,
                loading: false,
                loaded: action.payload.loaded,
                errors: false,
                loadingAcompanhamento: false
            };
        }

        case ProcessoCapaActions.GET_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ProcessoCapaActions.SET_TOGGLE_ACOMPANHAMENTO: {
            return {
                ...state,
                loadingAcompanhamento: action.payload.loadingAcompanhamento
            };
        }

        case ProcessoCapaActions.SET_TOGGLE_ACOMPANHAMENTO_SUCCESS: {
            return {
                ...state,
                loadingAcompanhamento: action.payload.loadingAcompanhamento
            };
        }

        default:
            return state;
    }
}
