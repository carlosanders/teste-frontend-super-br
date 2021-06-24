import * as ProcessoViewVinculacaoDocumentoActions from '../actions';

export interface ProcessoViewVinculacaoDocumentoState {
    juntadaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const JuntadaListInitialState: ProcessoViewVinculacaoDocumentoState = {
    juntadaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ProcessoViewVinculacaoDocumentoReducer(state = JuntadaListInitialState, action: ProcessoViewVinculacaoDocumentoActions.ProcessoViewVinculacaoDocumentoActionsAll): ProcessoViewVinculacaoDocumentoState {
    switch (action.type) {

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA: {
            return {
                ...state,
                juntadaId: null,
                loading: true
            };
        }

        case ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_SUCCESS: {
            return {
                ...state,
                juntadaId: action.payload.juntadaId,
                loaded: action.payload.loaded,
                loading: false
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

        default:
            return state;
    }
}
