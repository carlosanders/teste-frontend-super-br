import * as EspecieSetorActions from '../actions/especie-setor.actions';

export interface EspecieSetorState {
    modeloId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EspecieSetorInitialState: EspecieSetorState = {
    modeloId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function EspecieSetorReducer(
    state = EspecieSetorInitialState,
    action: EspecieSetorActions.EspecieSetorActionsAll
): EspecieSetorState {
    switch (action.type) {

        case EspecieSetorActions.GET_ESPECIE_SETOR: {
            return {
                ...state,
                modeloId: null,
                loading: true
            };
        }

        case EspecieSetorActions.GET_ESPECIE_SETOR_SUCCESS: {

            return {
                ...state,
                modeloId: action.payload.modeloId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EspecieSetorActions.GET_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
