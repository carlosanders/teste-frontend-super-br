import * as RootLocalizadorEditActions from '../actions/localizador-edit.actions';

export interface RootLocalizadorEditState {
    localizadorId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RootLocalizadorEditInitialState: RootLocalizadorEditState = {
    localizadorId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RootLocalizadorEditReducer(
    state = RootLocalizadorEditInitialState,
    action: RootLocalizadorEditActions.RootLocalizadorEditActionsAll
): RootLocalizadorEditState {
    switch (action.type) {

        case RootLocalizadorEditActions.GET_LOCALIZADOR: {
            return {
                ...state,
                localizadorId: null,
                loading: true
            };
        }

        case RootLocalizadorEditActions.GET_LOCALIZADOR_SUCCESS: {

            return {
                ...state,
                localizadorId: action.payload.localizadorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RootLocalizadorEditActions.CREATE_LOCALIZADOR: {
            return {
                ...state,
                localizadorId: null,
                loaded: {
                    id: 'localizadorHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RootLocalizadorEditActions.GET_LOCALIZADOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RootLocalizadorEditActions.SAVE_LOCALIZADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RootLocalizadorEditActions.SAVE_LOCALIZADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RootLocalizadorEditActions.SAVE_LOCALIZADOR_FAILED: {
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
