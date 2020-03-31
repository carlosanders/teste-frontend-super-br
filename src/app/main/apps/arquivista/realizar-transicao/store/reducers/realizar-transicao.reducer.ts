import * as RealizarTransicaoActions from '../actions';

export interface RealizarTransicaoState {
    transicaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RealizarTransicaoInitialState: RealizarTransicaoState = {
    errors: false,
    transicaoId: null,
    loaded: false,
    loading: false,
    saving: false
}

export function RealizarTransicaoReducer(
    state = RealizarTransicaoInitialState,
    action: RealizarTransicaoActions.RealizarTransicaoActionsAll
): RealizarTransicaoState {
    switch (action.type) {

        case RealizarTransicaoActions.GET_REALIZAR_TRANSICAO : {
            return {
                ...state,
                transicaoId: null,
                loading: true
            };
        }

        case RealizarTransicaoActions.GET_REALIZAR_TRANSICAO_SUCCESS: {

            return {
                ...state,
                transicaoId: action.payload.transicaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }


        case RealizarTransicaoActions.GET_REALIZAR_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

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

        default:
            return state;
    }

}

