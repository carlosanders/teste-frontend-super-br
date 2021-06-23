import * as VinculacaoDocumentoCreateActions from '../actions';

export interface VinculacaoDocumentoCreateState {
    juntadaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const JuntadaListInitialState: VinculacaoDocumentoCreateState = {
    juntadaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function VinculacaoDocumentoCreateReducer(state = JuntadaListInitialState, action: VinculacaoDocumentoCreateActions.VinculacaoDocumentoCreateActionsAll): VinculacaoDocumentoCreateState {
    switch (action.type) {

        case VinculacaoDocumentoCreateActions.GET_JUNTADA: {
            return {
                ...state,
                juntadaId: null,
                loading: true
            };
        }

        case VinculacaoDocumentoCreateActions.GET_JUNTADA_SUCCESS: {
            return {
                ...state,
                juntadaId: action.payload.juntadaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VinculacaoDocumentoCreateActions.GET_JUNTADA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case VinculacaoDocumentoCreateActions.SAVE_VINCULACAO_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VinculacaoDocumentoCreateActions.SAVE_VINCULACAO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case VinculacaoDocumentoCreateActions.SAVE_VINCULACAO_DOCUMENTO_FAILED: {
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
