import * as RealizarTransicaoActions from '../actions/realizar-transicao.actions';

export interface RealizarTransicaoState {
    transicaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RealizarTransicaoInitialState: RealizarTransicaoState = {
    transicaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RealizarTransicaoReducer(
    state = RealizarTransicaoInitialState,
    action: RealizarTransicaoActions.RealizarTransicaoActionsAll
): RealizarTransicaoState {
    switch (action.type) {

        case RealizarTransicaoActions.SAVE_TRANSICAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_TRANSICAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_TRANSICAO_FAILED: {
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
