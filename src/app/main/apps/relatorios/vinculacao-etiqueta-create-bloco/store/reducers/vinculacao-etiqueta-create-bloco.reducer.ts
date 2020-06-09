import * as VinculacaoEtiquetaCreateBlocoActions from '../actions/vinculacao-etiqueta-create-bloco.actions';

export interface VinculacaoEtiquetaCreateBlocoState {
    savingRelatoriosId: number[];
    errors: any;
}

export const VinculacaoEtiquetaCreateInitialState: VinculacaoEtiquetaCreateBlocoState = {
    savingRelatoriosId: [],
    errors: false
};

export function VinculacaoEtiquetaCreateBlocoReducer(
    state = VinculacaoEtiquetaCreateInitialState, action: VinculacaoEtiquetaCreateBlocoActions.VinculacaoEtiquetaCreateBlocoActionsAll
): VinculacaoEtiquetaCreateBlocoState {
    switch (action.type) {

        case VinculacaoEtiquetaCreateBlocoActions.CREATE_VINCULACAO_ETIQUETA: {
            return {
                savingRelatoriosId: [],
                errors: false
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                savingRelatoriosId: [...state.savingRelatoriosId, action.payload.relatorio.id]
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                savingRelatoriosId: state.savingRelatoriosId.filter(id => id !== action.payload.relatorio.id)
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                savingRelatoriosId: state.savingRelatoriosId.filter(id => id !== action.payload.relatorio.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
