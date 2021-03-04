import * as ArquivistaDetailActions from '../actions';
import * as TarefasActions from '../../../../tarefas/store/actions/tarefas.actions';

export interface ArquivistaDetailState {
    processoId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    errors: any;
    savingVinculacaoEtiquetaId: number;
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
    savingVinculacaoEtiquetaId: null,
    maximizado: false,
    // processo: null
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
