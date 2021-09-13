import * as VinculacaoEtiquetaCreateBlocoActions from '../actions/vinculacao-etiqueta-create-bloco.actions';

export interface VinculacaoEtiquetaCreateBlocoState {
    savingDocumentosAvulsoId: number[];
    errors: any;
}

export const VinculacaoEtiquetaCreateInitialState: VinculacaoEtiquetaCreateBlocoState = {
    savingDocumentosAvulsoId: [],
    errors: false
};

export function VinculacaoEtiquetaCreateBlocoReducer(
    state = VinculacaoEtiquetaCreateInitialState, action: VinculacaoEtiquetaCreateBlocoActions.VinculacaoEtiquetaCreateBlocoActionsAll
): VinculacaoEtiquetaCreateBlocoState {
    switch (action.type) {

        case VinculacaoEtiquetaCreateBlocoActions.CREATE_VINCULACAO_ETIQUETA: {
            return {
                savingDocumentosAvulsoId: [],
                errors: false
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                savingDocumentosAvulsoId: [...state.savingDocumentosAvulsoId, action.payload.vinculacaoEtiqueta.documentoAvulso.id]
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                savingDocumentosAvulsoId: state.savingDocumentosAvulsoId.filter(id => id !== action.payload.vinculacaoEtiqueta.documentoAvulso.id)
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                savingDocumentosAvulsoId: state.savingDocumentosAvulsoId.filter(id => id !== action.payload.documentoAvulsoId),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
