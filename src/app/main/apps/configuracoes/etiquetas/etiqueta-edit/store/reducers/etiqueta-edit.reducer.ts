import * as EtiquetaEditActions from '../actions/etiqueta-edit.actions';

export interface EtiquetaEditState {
    etiquetaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EtiquetaEditInitialState: EtiquetaEditState = {
    etiquetaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EtiquetaEditReducer(
    state = EtiquetaEditInitialState,
    action: EtiquetaEditActions.EtiquetaEditActionsAll
): EtiquetaEditState {
    switch (action.type) {

        case EtiquetaEditActions.GET_ETIQUETA: {
            return {
                ...state,
                etiquetaId: null,
                loading: true
            };
        }

        case EtiquetaEditActions.GET_ETIQUETA_SUCCESS: {

            return {
                ...state,
                etiquetaId: action.payload.etiquetaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EtiquetaEditActions.CREATE_ETIQUETA: {
            return {
                ...state,
                etiquetaId: null,
                loaded: {
                    id: 'etiquetaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EtiquetaEditActions.GET_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

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
