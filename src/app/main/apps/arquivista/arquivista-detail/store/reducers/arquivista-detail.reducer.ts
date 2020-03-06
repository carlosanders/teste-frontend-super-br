import * as ArquivistaDetailActions from '../actions';

export interface ArquivistaDetailState {
    processoId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    errors: any;
    savingVincEtiquetaId: number;
    maximizado: boolean;
    // processo: any;
}

export const ArquivistaDetailInitialState: ArquivistaDetailState = {
    deleting: false,
    errors: false,
    loaded: false,
    loading: false,
    processoId: null,
    saving: false,
    savingVincEtiquetaId: null,
    maximizado: false,
    // processo: null
}

export function ArquivistaDetailReducer(
    state = ArquivistaDetailInitialState,
    action: ArquivistaDetailActions.ArquivistaDetailActionsAll
): ArquivistaDetailState {
    switch (action.type) {

        default:
            return state;
    }
}