import * as ProcessoCapaActions from '../actions';

export interface ProcessoCapaState {
    processoId: number;
    loading: boolean;
    loaded: any;
    errors: any;
    loadingAssuntosProcessosId: number[];
    loadingInteressadosProcessosId: number[];
}

export const ProcessoInitialState: ProcessoCapaState = {
    processoId: null,
    loading: false,
    loaded: false,
    errors: false,
    loadingAssuntosProcessosId: [],
    loadingInteressadosProcessosId: []
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

        case ProcessoCapaActions.GET_ASSUNTOS_PROCESSO: {
            return {
                ...state,
                loadingAssuntosProcessosId: (state.loadingAssuntosProcessosId.indexOf(action.payload.processoId) === -1
                    ? [...state.loadingAssuntosProcessosId, action.payload.processoId] : [...state.loadingAssuntosProcessosId])
            };
        }

        case ProcessoCapaActions.GET_ASSUNTOS_PROCESSO_SUCCESS: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };
        }

        case ProcessoCapaActions.GET_ASSUNTOS_PROCESSO_FAILED: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };
        }

        case ProcessoCapaActions.GET_INTERESSADOS_PROCESSO: {
            return {
                ...state,
                loadingInteressadosProcessosId: (state.loadingInteressadosProcessosId.indexOf(action.payload.processoId) === -1
                    ? [...state.loadingInteressadosProcessosId, action.payload.processoId] : [...state.loadingInteressadosProcessosId])
            };
        }

        case ProcessoCapaActions.GET_INTERESSADOS_PROCESSO_SUCCESS: {
            return {
                ...state,
                loadingInteressadosProcessosId: state.loadingInteressadosProcessosId.filter(id => id !== action.payload)
            };
        }

        case ProcessoCapaActions.GET_INTERESSADOS_PROCESSO_FAILED: {
            return {
                ...state,
                loadingInteressadosProcessosId: state.loadingInteressadosProcessosId.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
