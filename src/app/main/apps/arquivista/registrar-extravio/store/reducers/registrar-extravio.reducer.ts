import * as RegistrarExtravioActions from '../actions';

export interface RegistrarExtravioState {
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RegistrarExtravioInitialState: RegistrarExtravioState = {
    errors: false,
    loaded: false,
    loading: false,
    saving: false
};

export function RegistrarExtravioReducer(
    state = RegistrarExtravioInitialState,
    action: RegistrarExtravioActions.RegistrarExtravioActionsAll
): RegistrarExtravioState {
    switch (action.type) {

        case RegistrarExtravioActions.SAVE_REGISTRAR_EXTRAVIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RegistrarExtravioActions.SAVE_REGISTRAR_EXTRAVIO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RegistrarExtravioActions.SAVE_REGISTRAR_EXTRAVIO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RegistrarExtravioActions.GET_PROCESSO: {
            return {
                ...state,
                loading: true
            };
        }

        case RegistrarExtravioActions.GET_PROCESSO_SUCCESS: {
            return {
                ...state,
                loading: false,
            };
        }

        case RegistrarExtravioActions.GET_PROCESSO_FAILED: {
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

