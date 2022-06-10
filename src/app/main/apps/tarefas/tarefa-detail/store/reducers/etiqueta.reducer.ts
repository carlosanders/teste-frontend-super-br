import * as EtiquetaActions from '../actions/etiqueta.actions';

export interface EtiquetaState {
    etiquetaId: number;
    loading: boolean;
    loaded: any;
    errors: any;
    loadingAcoes: boolean;
    acoesId: number[];
}

export const EtiquetaInitialState: EtiquetaState = {
    etiquetaId: null,
    loading: false,
    loaded: false,
    errors: null,
    loadingAcoes: false,
    acoesId: []
};

export function EtiquetaReducer(state = EtiquetaInitialState, action: EtiquetaActions.EtiquetaActionsAll): EtiquetaState {
    switch (action.type) {

        case EtiquetaActions.CREATE_ETIQUETA: {
            return {
                ...state,
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
                ...state,
                etiquetaId: null,
                loaded: false,
                loading: true,
                errors: null
            };
        }

        case EtiquetaActions.GET_ETIQUETA_SUCCESS: {
            return {
                ...state,
                etiquetaId: action.payload.etiquetaId,
                loading: false,
                loaded: action.payload.loaded,
                errors: null
            };
        }

        case EtiquetaActions.GET_ETIQUETA_FAILED: {
            return {
                ...state,
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

        case EtiquetaActions.GET_ACOES_ETIQUETA: {
            return {
                ...state,
                acoesId: [],
                loadingAcoes: true
            };
        }

        case EtiquetaActions.GET_ACOES_ETIQUETA_SUCCESS: {
            return {
                ...state,
                acoesId: action.payload,
                loadingAcoes: false
            };
        }

        case EtiquetaActions.GET_ACOES_ETIQUETA_FAILED: {
            return {
                ...state,
                acoesId: [],
                loadingAcoes: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
