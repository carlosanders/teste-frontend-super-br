import * as ProcessoViewDesentranhamentoActions from '../actions';

export interface ProcessoViewDesentranhamentoState {
    juntadaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const JuntadaListInitialState: ProcessoViewDesentranhamentoState = {
    juntadaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
};

export function ProcessoViewDesentranhamentoReducer(state = JuntadaListInitialState, action: ProcessoViewDesentranhamentoActions.ProcessoViewDesentranhamentoActionsAll): ProcessoViewDesentranhamentoState {
    switch (action.type) {

        case ProcessoViewDesentranhamentoActions.GET_JUNTADA: {
            return {
                ...state,
                loading: true
            };
        }

        case ProcessoViewDesentranhamentoActions.GET_JUNTADA_SUCCESS: {
            const loaded = action.payload.loaded;
            return {
                ...state,
                loading: false,
                loaded
            };
        }

        case ProcessoViewDesentranhamentoActions.GET_JUNTADA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ProcessoViewDesentranhamentoActions.SAVE_DESENTRANHAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ProcessoViewDesentranhamentoActions.SAVE_DESENTRANHAMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProcessoViewDesentranhamentoActions.SAVE_DESENTRANHAMENTO_FAILED: {
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
