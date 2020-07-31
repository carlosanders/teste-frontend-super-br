import * as ProcessoCapaActions from '../actions/processo-capa.actions';

export interface ProcessoCapaState {
    processoId: number;
    loading: boolean;
    loadingAssuntos: boolean;
    loadingInteressados: boolean;
    loaded: any;
    errors: any;
}

export const ProcessoInitialState: ProcessoCapaState = {
    processoId: null,
    loading: false,
    loadingAssuntos: false,
    loadingInteressados: false,
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
                errors: false
            };
        }

        case ProcessoCapaActions.GET_PROCESSO_FAILED: {
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
