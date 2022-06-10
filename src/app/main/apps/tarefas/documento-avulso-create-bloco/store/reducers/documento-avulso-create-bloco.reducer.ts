import * as DocumentoAvulsoCreateBlocoActions from '../actions/documento-avulso-create-bloco.actions';

export interface DocumentoAvulsoCreateBlocoState {
    savingProcessosId: number[];
    errors: any;
}

export const DocumentoAvulsoCreateInitialState: DocumentoAvulsoCreateBlocoState = {
    savingProcessosId: [],
    errors: false
};

export function DocumentoAvulsoCreateBlocoReducer(
    state = DocumentoAvulsoCreateInitialState, action: DocumentoAvulsoCreateBlocoActions.DocumentoAvulsoCreateBlocoActionsAll
): DocumentoAvulsoCreateBlocoState {
    switch (action.type) {

        case DocumentoAvulsoCreateBlocoActions.CREATE_DOCUMENTO_AVULSO: {
            return {
                savingProcessosId: [],
                errors: false
            };
        }

        case DocumentoAvulsoCreateBlocoActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                savingProcessosId: [...state.savingProcessosId, action.payload.documentoAvulso?.processo?.id]
            };
        }

        case DocumentoAvulsoCreateBlocoActions.SAVE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.documentoAvulso?.processo?.id)
            };
        }

        case DocumentoAvulsoCreateBlocoActions.SAVE_DOCUMENTO_AVULSO_FAILED: {
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
