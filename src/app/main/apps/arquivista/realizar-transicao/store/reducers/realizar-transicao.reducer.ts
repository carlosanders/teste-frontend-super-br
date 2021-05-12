import * as RealizarTransicaoActions from '../actions';

export interface RealizarTransicaoState {
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RealizarTransicaoInitialState: RealizarTransicaoState = {
    errors: false,
    loaded: false,
    loading: false,
    saving: false
};

export function RealizarTransicaoReducer(
    state = RealizarTransicaoInitialState,
    action: RealizarTransicaoActions.RealizarTransicaoActionsAll
): RealizarTransicaoState {
    switch (action.type) {

        case RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO_FAILED: {
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

