import * as RootLocalizadoresActions from '../actions/localizadores.actions';

export interface RootLocalizadoresState {
    setorId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RootLocalizadoresInitialState: RootLocalizadoresState = {
    setorId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function RootLocalizadoresReducer(
    state = RootLocalizadoresInitialState,
    action: RootLocalizadoresActions.RootLocalizadoresActionsAll
): RootLocalizadoresState {
    switch (action.type) {

        case RootLocalizadoresActions.GET_SETOR: {
            return {
                ...state,
                setorId: null,
                loading: true
            };
        }

        case RootLocalizadoresActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RootLocalizadoresActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
