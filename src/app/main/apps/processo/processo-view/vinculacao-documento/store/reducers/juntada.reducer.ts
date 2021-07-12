import * as ProcessoViewVinculacaoDocumentoActions from '../actions';

export interface ProcessoViewVinculacaoDocumentoState {
    juntadaId: number;
    juntadaVinculadaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
    loadedVinculada: any;
}

export const JuntadaListInitialState: ProcessoViewVinculacaoDocumentoState = {
    juntadaId: null,
    juntadaVinculadaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
    loadedVinculada: false
};

export function ProcessoViewVinculacaoDocumentoReducer(state = JuntadaListInitialState, action: ProcessoViewVinculacaoDocumentoActions.ProcessoViewVinculacaoDocumentoActionsAll): ProcessoViewVinculacaoDocumentoState {
    switch (action.type) {

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA: {
            return {
                ...state,
                loading: true
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_SUCCESS: {
            const loaded = action.payload.loaded ?? state.loaded;
            const loadedVinculada = action.payload.loadedVinculada ?? state.loadedVinculada;
            return {
                ...state,
                loading: false,
                loaded,
                loadedVinculada
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.UNLOAD_JUNTADA_VINCULADA: {
            return {
                ...state,
                loadedVinculada: false
            }
        }

        default:
            return state;
    }
}
