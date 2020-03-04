import * as LocalizadorEditActions from '../actions/localizador-edit.actions';

export interface LocalizadorEditState {
    localizadorId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const LocalizadorEditInitialState: LocalizadorEditState = {
    localizadorId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function LocalizadorEditReducer(
    state = LocalizadorEditInitialState,
    action: LocalizadorEditActions.LocalizadorEditActionsAll
): LocalizadorEditState {
    switch (action.type) {

        case LocalizadorEditActions.GET_LOCALIZADOR: {
            return {
                ...state,
                localizadorId: null,
                loading: true
            };
        }

        case LocalizadorEditActions.GET_LOCALIZADOR_SUCCESS: {

            return {
                ...state,
                localizadorId: action.payload.localizadorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LocalizadorEditActions.CREATE_LOCALIZADOR: {
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

        case LocalizadorEditActions.GET_LOCALIZADOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LocalizadorEditActions.SAVE_LOCALIZADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case LocalizadorEditActions.SAVE_LOCALIZADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case LocalizadorEditActions.SAVE_LOCALIZADOR_FAILED: {
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
