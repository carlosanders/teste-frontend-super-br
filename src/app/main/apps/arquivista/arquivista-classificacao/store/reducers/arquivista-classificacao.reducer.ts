import * as ArquivistaClassificacaoActions from '../actions';

export interface ArquivistaClassificacaoState {
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

export const ArquivistaClassificacaoInitialState: ArquivistaClassificacaoState = {
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

export function ArquivistaClassificacaoReducer(
    state = ArquivistaClassificacaoInitialState,
    action: ArquivistaClassificacaoActions.ArquivistaClassificacaoActionsAll
): ArquivistaClassificacaoState {
    switch (action.type) {

        case ArquivistaClassificacaoActions.GET_PROCESSO:
            return {
                ...state,
                loading: true
            };

        case ArquivistaClassificacaoActions.GET_PROCESSO_SUCCESS:
            return {
                ...state,
                processoId: action.payload.loaded.id,
                loading: false
            };

        case ArquivistaClassificacaoActions.GET_PROCESSO_FAILED:
            return {
                ...state,
                loading: false
            };


        default:
            return state;
    }
}