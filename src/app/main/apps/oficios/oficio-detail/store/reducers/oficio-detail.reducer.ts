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
}

export const OficioDetailInitialState: OficioDetailState = {
    documentoAvulsoId: null,
    loading: false,
    loaded: false,
    saving: false,
    deleting: false,
    errors: false,
    documentosId: [],
    documentosLoaded: false
};

export function OficioDetailReducer(state = OficioDetailInitialState, action: OficioDetailActions.OficioDetailActionsAll): OficioDetailState {
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
                documentoAvulsoId: action.payload.documentoAvulso.id,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case OficioDetailActions.GET_DOCUMENTO_AVULSO_FAILED: {
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

        default:
            return state;
    }
}
