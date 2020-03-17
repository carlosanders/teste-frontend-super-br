import * as LocalizadorActions from '../actions/localizador.actions';

export interface LocalizadorState {
    setorId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const LocalizadorInitialState: LocalizadorState = {
    setorId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function LocalizadorReducer(
    state = LocalizadorInitialState,
    action: LocalizadorActions.LocalizadorActionsAll
): LocalizadorState {
    switch (action.type) {

        case LocalizadorActions.GET_SETOR: {
            return {
                ...state,
                setorId: null,
                loading: true
            };
        }

        case LocalizadorActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LocalizadorActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
