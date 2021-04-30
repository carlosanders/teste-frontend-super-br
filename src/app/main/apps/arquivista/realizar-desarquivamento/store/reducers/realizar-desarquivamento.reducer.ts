import * as RealizarTransicaoActions from '../actions';

export interface RealizarDesarquivamentoState {
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RealizarDesarquivamentoInitialState: RealizarDesarquivamentoState = {
    errors: false,
    loaded: false,
    loading: false,
    saving: false
};

export function RealizarDesarquivamentoReducer(
    state = RealizarDesarquivamentoInitialState,
    action: RealizarTransicaoActions.RealizarDesarquivamentoActionsAll
): RealizarDesarquivamentoState {
    switch (action.type) {

        case RealizarTransicaoActions.SAVE_REALIZAR_DESARQUIVAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_REALIZAR_DESARQUIVAMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_REALIZAR_DESARQUIVAMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RealizarTransicaoActions.GET_PROCESSO: {
            return {
                ...state,
                loading: true
            };
        }

        case RealizarTransicaoActions.GET_PROCESSO_SUCCESS: {
            return {
                ...state,
                loading: false,
            };
        }

        case RealizarTransicaoActions.GET_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false
            };
        }

        default:
            return state;
    }

}

