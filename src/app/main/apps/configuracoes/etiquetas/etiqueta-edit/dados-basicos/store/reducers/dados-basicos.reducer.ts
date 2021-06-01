import * as EtiquetaEditActions from '../actions/dados-basicos.actions';

export interface EtiquetaEditState {
    saving: boolean;
    errors: any;
}

export const EtiquetaEditInitialState: EtiquetaEditState = {
    saving: false,
    errors: false,
};

export function EtiquetaEditReducer(
    state = EtiquetaEditInitialState,
    action: EtiquetaEditActions.EtiquetaEditActionsAll
): EtiquetaEditState {
    switch (action.type) {

        case EtiquetaEditActions.SAVE_ETIQUETA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EtiquetaEditActions.SAVE_ETIQUETA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case EtiquetaEditActions.SAVE_ETIQUETA_FAILED: {
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
