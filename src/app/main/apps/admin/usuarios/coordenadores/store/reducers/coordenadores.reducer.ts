import * as CoordenadoresActions from '../actions/coordenadores.actions';

export interface CoordenadoresState {
    usuarioId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CoordenadoresInitialState: CoordenadoresState = {
    usuarioId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function CoordenadoresReducer(
    state = CoordenadoresInitialState,
    action: CoordenadoresActions.CoordenadoresActionsAll
): CoordenadoresState {
    switch (action.type) {

        case CoordenadoresActions.GET_USUARIO: {
            return {
                ...state,
                usuarioId: null,
                loading: true
            };
        }

        case CoordenadoresActions.GET_USUARIO_SUCCESS: {

            return {
                ...state,
                usuarioId: action.payload.usuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CoordenadoresActions.GET_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
