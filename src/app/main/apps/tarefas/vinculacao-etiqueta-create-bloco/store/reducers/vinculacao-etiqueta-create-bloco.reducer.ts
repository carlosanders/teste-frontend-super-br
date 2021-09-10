import * as VinculacaoEtiquetaCreateBlocoActions from '../actions/vinculacao-etiqueta-create-bloco.actions';

export interface VinculacaoEtiquetaCreateBlocoState {
    savingTarefasId: number[];
    errors: any;
}

export const VinculacaoEtiquetaCreateInitialState: VinculacaoEtiquetaCreateBlocoState = {
    savingTarefasId: [],
    errors: false
};

export function VinculacaoEtiquetaCreateBlocoReducer(
    state = VinculacaoEtiquetaCreateInitialState, action: VinculacaoEtiquetaCreateBlocoActions.VinculacaoEtiquetaCreateBlocoActionsAll
): VinculacaoEtiquetaCreateBlocoState {
    switch (action.type) {

        case VinculacaoEtiquetaCreateBlocoActions.CREATE_VINCULACAO_ETIQUETA: {
            return {
                savingTarefasId: [],
                errors: false
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.vinculacaoEtiqueta.tarefa.id]
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.vinculacaoEtiqueta.tarefa.id)
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.id),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
