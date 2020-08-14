import * as EtiquetaActions from '../actions/etiqueta.actions';

export interface EtiquetaState {
    etiquetaId: number;
    loading: boolean;
    loaded: any;
    errors: any;
}

export const EtiquetaInitialState: EtiquetaState = {
    etiquetaId: null,
    loading: false,
    loaded: false,
    errors: null,
};

export function EtiquetaReducer(state = EtiquetaInitialState, action: EtiquetaActions.EtiquetaActionsAll): EtiquetaState {
    switch (action.type) {

        case EtiquetaActions.CREATE_ETIQUETA: {
            return {
                etiquetaId: null,
                loaded: {
                    id: 'etiquetaHandle',
                    value: 'criar'
                },
                loading: false,
                errors: null
            };
        }

        case EtiquetaActions.GET_ETIQUETA: {
            return {
                etiquetaId: null,
                loaded: false,
                loading: true,
                errors: null
            };
        }

        case EtiquetaActions.GET_ETIQUETA_SUCCESS: {
            return {
                etiquetaId: action.payload.etiquetaId,
                loading: false,
                loaded: action.payload.loaded,
                errors: null
            };
        }

        case EtiquetaActions.GET_ETIQUETA_FAILED: {
            return {
                etiquetaId: null,
                loading: false,
                loaded: false,
                errors: action.payload
            };
        }

        case EtiquetaActions.SAVE_ETIQUETA: {
            return {
                ...state,
                etiquetaId: action.payload.etiqueta.id,
                loading: true,
                loaded: false,
                errors: null
            };
        }

        case EtiquetaActions.SAVE_ETIQUETA_SUCCESS: {
            return {
                ...state,
                etiquetaId: null,
                loading: false,
                loaded: true,
                errors: null
            };
        }

        case EtiquetaActions.SAVE_ETIQUETA_FAILED: {
            return {
                ...state,
                etiquetaId: action.payload.etiquetaId,
                loading: false,
                loaded: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
