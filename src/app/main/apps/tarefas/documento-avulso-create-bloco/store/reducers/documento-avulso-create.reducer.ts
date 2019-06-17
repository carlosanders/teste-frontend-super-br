import * as DocumentoAvulsoCreateActions from '../actions/documento-avulso-create.actions';

export interface DocumentoAvulsoCreateState {
    savingProcessosId: number[];
    errors: any;
}

export const DocumentoAvulsoCreateInitialState: DocumentoAvulsoCreateState = {
    savingProcessosId: [],
    errors: false
};

export function DocumentoAvulsoCreateReducer(
    state = DocumentoAvulsoCreateInitialState, action: DocumentoAvulsoCreateActions.DocumentoAvulsoCreateActionsAll
): DocumentoAvulsoCreateState {
    switch (action.type) {

        case DocumentoAvulsoCreateActions.CREATE_DOCUMENTO_AVULSO: {
            return {
                savingProcessosId: [],
                errors: false
            };
        }

        case DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                savingProcessosId: [...state.savingProcessosId, action.payload.processo.id]
            };
        }

        case DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.processo.id)
            };
        }

        case DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.processo.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
