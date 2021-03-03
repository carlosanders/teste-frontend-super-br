import * as ModalidadeAcaoEtiquetaActions from '../actions/modalidade-acao-etiqueta.actions';

export interface AcaoTriggerState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AcaoTriggertInitialState: AcaoTriggerState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AcaoTriggerReducer(
    state = AcaoTriggertInitialState,
    action: ModalidadeAcaoEtiquetaActions.ModalidadeAcaoEtiquetaActionsAll
): AcaoTriggerState {
    switch (action.type) {

        case ModalidadeAcaoEtiquetaActions.GET_MODALIDADE_ACAO_ETIQUETA: {
            return {
                ...state,
                entityId: null,
                loading: true,
                loaded: false
            };
        }

        case ModalidadeAcaoEtiquetaActions.GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ModalidadeAcaoEtiquetaActions.GET_MODALIDADE_ACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
