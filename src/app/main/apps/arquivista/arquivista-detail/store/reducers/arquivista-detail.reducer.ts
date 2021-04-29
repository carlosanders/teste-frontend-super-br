import * as ArquivistaDetailActions from '../actions';

export interface ArquivistaDetailState {
    savingVinculacaoEtiquetaId: number;
    maximizado: boolean;
}

export const ArquivistaDetailInitialState: ArquivistaDetailState = {
    savingVinculacaoEtiquetaId: null,
    maximizado: false,
};

export function ArquivistaDetailReducer(
    state = ArquivistaDetailInitialState,
    action: ArquivistaDetailActions.ArquivistaDetailActionsAll
): ArquivistaDetailState {
    switch (action.type) {

        case ArquivistaDetailActions.TOGGLE_MAXIMIZADO: {
            return {
                ...state,
                maximizado: action.payload
            };
        }

        default:
            return state;
    }
}
