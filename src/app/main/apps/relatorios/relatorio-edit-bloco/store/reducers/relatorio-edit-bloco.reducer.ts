import * as RelatorioEditBlocoActions from '../actions/relatorio-edit-bloco.actions';

export interface RelatorioEditBlocoState {
    savingId: number[];
    errors: any;
}

export const RelatorioEditInitialState: RelatorioEditBlocoState = {
    savingId: [],
    errors: false
};

export function RelatorioEditBlocoReducer(
    state = RelatorioEditInitialState, action: RelatorioEditBlocoActions.RelatorioEditBlocoActionsAll
): RelatorioEditBlocoState {
    switch (action.type) {

        case RelatorioEditBlocoActions.EDIT_RELATORIO: {
            return {
                savingId: [],
                errors: false
            };
        }

        case RelatorioEditBlocoActions.SAVE_RELATORIO: {
            return {
                ...state,
                savingId: [...state.savingId, action.payload.relatorio.id]
            };
        }

        case RelatorioEditBlocoActions.SAVE_RELATORIO_SUCCESS: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.relatorio.id)
            };
        }

        case RelatorioEditBlocoActions.SAVE_RELATORIO_FAILED: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.relatorio.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
