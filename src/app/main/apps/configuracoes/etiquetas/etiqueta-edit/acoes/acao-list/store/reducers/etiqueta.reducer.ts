import * as EtiquetaActions from '../actions/etiqueta.actions';

export interface EtiquetaState {
    etiquetaId: number;
    loading: boolean;
    loaded: any;
}

export const EtiquetaInitialState: EtiquetaState = {
    etiquetaId: null,
    loading: false,
    loaded: false
};

export function EtiquetaReducer(state = EtiquetaInitialState, action: EtiquetaActions.EtiquetaActionsAll): EtiquetaState {
    switch (action.type) {

        case EtiquetaActions.GET_ETIQUETA: {
            return {
                etiquetaId: null,
                loaded: false,
                loading: true
            };
        }

        case EtiquetaActions.GET_ETIQUETA_SUCCESS: {

            return {
                etiquetaId: action.payload.etiquetaId,
                loading: false,
                loaded: action.payload.loaded
            };
        }

        case EtiquetaActions.GET_ETIQUETA_FAILED: {
            return {
                etiquetaId: null,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
