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
}

export const ArquivistaDetailInitialState: ArquivistaDetailState = {
    deleting: false,
    errors: false,
    loaded: false,
    loading: false,
    processoId: null,
    saving: false,
    savingVincEtiquetaId: null,
    maximizado: false
}

export function ArquivistaDetailReducer(
    state = ArquivistaDetailInitialState,
    action: ArquivistaDetailActions.ArquivistaDetailActionsAll
): ArquivistaDetailState {
    switch (action.type) {

        case ArquivistaDetailActions.GET_PROCESSO:
            return {
                ...state,
                loading: true
            };

        case ArquivistaDetailActions.GET_PROCESSO_SUCCESS:
            return {
                ...state,
                processoId: action.payload.processo.id,
                loading: false
            };

        case ArquivistaDetailActions.GET_PROCESSO_FAILED:
            return {
                ...state,
                loading: false
            };


        default:
            return state;
    }
}