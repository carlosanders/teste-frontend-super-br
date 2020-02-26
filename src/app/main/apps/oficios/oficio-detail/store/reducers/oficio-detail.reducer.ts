import * as DocumentoAvulsoDetailActions from 'app/main/apps/oficios/oficio-detail/store/actions/oficio-detail.actions';

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

export function DocumentoAvulsoDetailReducer(state = DocumentoAvulsoDetailInitialState, action: DocumentoAvulsoDetailActions.DocumentoAvulsoDetailActionsAll): DocumentoAvulsoDetailState {
    switch (action.type) {

        case DocumentoAvulsoDetailActions.GET_DOCUMENTO_AVULSO: {
            return {
                ...state,
                loading: true
            };
        }

        case DocumentoAvulsoDetailActions.GET_DOCUMENTO_AVULSO_SUCCESS: {

            return {
                ...state,
                documentoAvulsoId: action.payload.documentoAvulso.id,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case DocumentoAvulsoDetailActions.GET_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DocumentoAvulsoDetailActions.GET_DOCUMENTOS_SUCCESS: {
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
