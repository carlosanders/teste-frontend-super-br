import * as EstadoActions from '../actions/estados.actions';

export interface EstadoState {
    estadosId: number[];
    estadosLoaded: any;
    loading: boolean;
    loaded: boolean;
    errors: any;
}

export const EstadoInitialState: EstadoState = {
    estadosId: [],
    estadosLoaded: false,
    loading: false,
    loaded: false,
    errors: false
};

export function EstadoReducer(state = EstadoInitialState, action: EstadoActions.EstadoActionsAll): EstadoState {
    switch (action.type) {

        case EstadoActions.GET_ESTADOS_SUCCESS: {
            return {
                ...state,
                estadosId: action.payload.entitiesId,
                estadosLoaded: true,
            };
        }

        case EstadoActions.GET_ESTADOS_FAILED: {
            return {
                ...state,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
