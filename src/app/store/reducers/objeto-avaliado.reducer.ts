import * as ObjetoAvaliadoActions from '../actions/objeto-avaliado.actions';

export interface ObjetoAvaliadoState {
    objetoAvaliadoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const objetoAvaliadoInitialState: ObjetoAvaliadoState = {
    objetoAvaliadoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export const objetoAvaliadoReducer = (
    state = objetoAvaliadoInitialState,
    action: ObjetoAvaliadoActions.ObjetoAvaliadoActionsAll
): ObjetoAvaliadoState => {
    switch (action.type) {

        case ObjetoAvaliadoActions.GET_OBJETO_AVALIADO: {
            return {
                ...state,
                objetoAvaliadoId: null,
                errors: false,
                loading: true
            };
        }

        case ObjetoAvaliadoActions.GET_OBJETO_AVALIADO_SUCCESS: {

            return {
                ...state,
                objetoAvaliadoId: action.payload.objetoAvaliadoId,
                loaded: action.payload.loaded,
                errors: false,
                loading: false
            };
        }

        case ObjetoAvaliadoActions.GET_OBJETO_AVALIADO_FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
};
