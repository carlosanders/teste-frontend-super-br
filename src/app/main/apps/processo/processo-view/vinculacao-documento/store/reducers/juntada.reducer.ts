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

export const juntadaListInitialState: ProcessoViewVinculacaoDocumentoState = {
    juntadaId: null,
    juntadaVinculadaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
    loadedVinculada: false
};

export const processoViewVinculacaoDocumentoReducer = (state = juntadaListInitialState, action: ProcessoViewVinculacaoDocumentoActions.ProcessoViewVinculacaoDocumentoActionsAll): ProcessoViewVinculacaoDocumentoState => {
    switch (action.type) {

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA: {
            return {
                ...state,
                juntadaId: null,
                loading: true,
                loaded: false
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_SUCCESS: {
            const loaded = action.payload.loaded;
            return {
                ...state,
                loading: false,
                juntadaId: action.payload.juntadaId,
                loaded
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_VINCULADA: {
            return {
                ...state,
                juntadaVinculadaId: null,
                loading: true,
                loadedVinculada: false
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_VINCULADA_SUCCESS: {
            const loadedVinculada = action.payload.loadedVinculada;
            return {
                ...state,
                loading: false,
                juntadaVinculadaId: action.payload.juntadaVinculadaId,
                loadedVinculada
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_VINCULADA_FAILED: {
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
                juntadaVinculadaId: null,
                loadedVinculada: false
            };
        }

        default:
            return state;
    }
};
