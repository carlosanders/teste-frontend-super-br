import * as OficioDetailActions from 'app/main/apps/oficios/oficio-detail/store/actions/oficio-detail.actions';

export interface OficioDetailState {
    documentoAvulsoId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    errors: any;
    documentosId: number[];
    documentosLoaded: any;
    savingVinculacaoEtiquetaId: number;
}

export const DocumentoAvulsoDetailInitialState: OficioDetailState = {
    documentoAvulsoId: null,
    loading: false,
    loaded: false,
    saving: false,
    deleting: false,
    errors: false,
    documentosId: [],
    documentosLoaded: false,
    savingVinculacaoEtiquetaId: null
};

export function OficioDetailReducer(state = DocumentoAvulsoDetailInitialState, action: OficioDetailActions.OficioDetailActionsAll): OficioDetailState {
    switch (action.type) {

        case OficioDetailActions.GET_DOCUMENTO_AVULSO: {
            return {
                ...state,
                loading: true
            };
        }

        case OficioDetailActions.GET_DOCUMENTO_AVULSO_SUCCESS: {

            return {
                ...state,
                documentoAvulsoId: action.payload.loaded.value,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case OficioDetailActions.GET_DOCUMENTOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case OficioDetailActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        case OficioDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                saving: true,
                savingVinculacaoEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case OficioDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                savingVinculacaoEtiquetaId: null
            };
        }

        case OficioDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                savingVinculacaoEtiquetaId: null
            };
        }

        default:
            return state;
    }
}
