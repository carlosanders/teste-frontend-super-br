import * as AfastamentosActions from '../actions/afastamentos.actions';

export interface AfastamentosState {
    usuarioId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AfastamentosInitialState: AfastamentosState = {
    usuarioId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function AfastamentosReducer(
    state = AfastamentosInitialState,
    action: AfastamentosActions.AfastamentosActionsAll
): AfastamentosState {
    switch (action.type) {

        case AfastamentosActions.GET_USUARIO: {
            return {
                ...state,
                usuarioId: null,
                loading: true
            };
        }

        case AfastamentosActions.GET_USUARIO_SUCCESS: {

            return {
                ...state,
                usuarioId: action.payload.usuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AfastamentosActions.GET_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
