import * as AvaliacaoActions from '../actions/avaliacao.actions';

export interface AvaliacaoState {
    avaliacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const avaliacaoInitialState: AvaliacaoState = {
    avaliacaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export const avaliacaoReducer = (
    state = avaliacaoInitialState,
    action: AvaliacaoActions.AvaliacaoActionsAll
): AvaliacaoState => {
    switch (action.type) {

        case AvaliacaoActions.GET_AVALIACAO: {
            return {
                ...state,
                avaliacaoId: null,
                errors: false,
                loading: true
            };
        }

        case AvaliacaoActions.GET_AVALIACAO_SUCCESS: {

            return {
                ...state,
                avaliacaoId: action.payload.avaliacaoId,
                loaded: action.payload.loaded,
                errors: false,
                loading: false
            };
        }

        case AvaliacaoActions.GET_AVALIACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AvaliacaoActions.SAVE_AVALIACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AvaliacaoActions.SAVE_AVALIACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AvaliacaoActions.SAVE_AVALIACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case AvaliacaoActions.UNLOAD_AVALIACAO: {
            return {
                ...avaliacaoInitialState
            };
        }

        default:
            return state;
    }
};
