import * as ArquivistaEditBlocoActions from '../actions/arquivista-edit-bloco.actions';

export interface ArquivistaEditBlocoState {
    savingId: number[];
    errors: any;
}

export const ArquivistaEditBlocoInitialState: ArquivistaEditBlocoState = {
    savingId: [],
    errors: false
};

export function ArquivistaEditBlocoReducer(
    state = ArquivistaEditBlocoInitialState, action: ArquivistaEditBlocoActions.ArquivistaEditBlocoActionsAll
): ArquivistaEditBlocoState {
    switch (action.type) {
        case ArquivistaEditBlocoActions.SAVE_PROCESSO: {
            return {
                ...state,
                savingId: [...state.savingId, action.payload.processo.id]
            };
        }

        case ArquivistaEditBlocoActions.SAVE_PROCESSO_SUCCESS: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.processo.id)
            };
        }

        case ArquivistaEditBlocoActions.SAVE_PROCESSO_FAILED: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.id),
                errors: action.payload.error
            };
        }

        default: {
            return {
                ...state
            };
        }
    }
}
