import * as VinculacaoEtiquetaCreateBlocoActions from '../actions/vinculacao-etiqueta-create-bloco.actions';

export interface VinculacaoEtiquetaCreateBlocoState {
    savingProcessosId: number[];
    errors: any;
}

export const VinculacaoEtiquetaCreateInitialState: VinculacaoEtiquetaCreateBlocoState = {
    savingProcessosId: [],
    errors: false
};

export function VinculacaoEtiquetaCreateBlocoReducer(
    state = VinculacaoEtiquetaCreateInitialState, action: VinculacaoEtiquetaCreateBlocoActions.VinculacaoEtiquetaCreateBlocoActionsAll
): VinculacaoEtiquetaCreateBlocoState {
    switch (action.type) {

        case VinculacaoEtiquetaCreateBlocoActions.CREATE_VINCULACAO_ETIQUETA: {
            return {
                savingProcessosId: [],
                errors: false
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                savingProcessosId: [...state.savingProcessosId, action.payload.vinculacaoEtiqueta.processo.id]
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.vinculacaoEtiqueta.processo.id)
            };
        }

        case VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.processoId),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
