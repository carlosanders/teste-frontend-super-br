import * as VinculacaoEtiquetaCreateActions from '../actions/vinculacao-etiqueta-create.actions';

export interface VinculacaoEtiquetaCreateState {
    savingTarefasId: number[];
    errors: any;
}

export const VinculacaoEtiquetaCreateInitialState: VinculacaoEtiquetaCreateState = {
    savingTarefasId: [],
    errors: false
};

export function VinculacaoEtiquetaCreateReducer(
    state = VinculacaoEtiquetaCreateInitialState, action: VinculacaoEtiquetaCreateActions.VinculacaoEtiquetaCreateActionsAll
): VinculacaoEtiquetaCreateState {
    switch (action.type) {

        case VinculacaoEtiquetaCreateActions.CREATE_VINCULACAO_ETIQUETA: {
            return {
                savingTarefasId: [],
                errors: false
            };
        }

        case VinculacaoEtiquetaCreateActions.SAVE_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.tarefa.id]
            };
        }

        case VinculacaoEtiquetaCreateActions.SAVE_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case VinculacaoEtiquetaCreateActions.SAVE_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefa.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
