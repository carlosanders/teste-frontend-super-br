import * as RealizarTransicaoActions from '../actions/realizar-transicao.actions';

export interface RealizarTransicaoState {
    transicaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TransicaoEditInitialState: RealizarTransicaoState = {
    transicaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RealizarTransicaoReducer(
    state = TransicaoEditInitialState,
    action: RealizarTransicaoActions.RealizarTransicaoActionsAll
): RealizarTransicaoState {
    switch (action.type) {

        case RealizarTransicaoActions.GET_TRANSICAO: {
            return {
                ...state,
                transicaoId: null,
                loading: true
            };
        }

        case RealizarTransicaoActions.GET_TRANSICAO_SUCCESS: {

            return {
                ...state,
                transicaoId: action.payload.transicaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RealizarTransicaoActions.CREATE_TRANSICAO: {
            return {
                ...state,
                transicaoId: null,
                loaded: {
                    id: 'transicaoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RealizarTransicaoActions.GET_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

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
