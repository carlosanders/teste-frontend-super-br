import * as OficioDetailActions from 'app/main/apps/oficios/oficio-detail/store/actions/oficio-detail.actions';

export interface DocumentoAvulsoDetailState {
    documentoAvulsoId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    errors: any;
    documentosId: number[];
    documentosLoaded: any;
}

export const DocumentoAvulsoDetailInitialState: DocumentoAvulsoDetailState = {
    documentoAvulsoId: null,
    loading: false,
    loaded: false,
    saving: false,
    deleting: false,
    errors: false,
    documentosId: [],
    documentosLoaded: false
};

export function OficioDetailReducer(state = DocumentoAvulsoDetailInitialState, action: OficioDetailActions.DocumentoAvulsoDetailActionsAll): DocumentoAvulsoDetailState {
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
                documentoAvulsoId: action.payload.documento.id,
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

        case OficioDetailActions.CREATE_DOCUMENTO_AVULSO: {
            return {
                documentoAvulsoId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
                deleting: false,
                documentosId: [],
                documentosLoaded: false
            };
        }

        case OficioDetailActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: true
            };
        }

        case OficioDetailActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case OficioDetailActions.SAVE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case OficioDetailActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        default:
            return state;
    }
}
