import * as RecebimentoActions from '../actions/recebimento.actions';

export interface RecebimentoTramitacaoState {
    tramitacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RecebimentoTramitacaoInitialState: RecebimentoTramitacaoState = {
    tramitacaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RecebimentoReducer(state = RecebimentoTramitacaoInitialState,
                                   action: RecebimentoActions.RecebimentoActionsAll): RecebimentoTramitacaoState {
    switch (action.type) {

        case RecebimentoActions.RECEBER_TRAMITACAO_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RecebimentoActions.RECEBER_TRAMITACAO_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RecebimentoActions.RECEBER_TRAMITACAO_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RecebimentoActions.GET_TRAMITACAO: {
            return {
                ...state,
                tramitacaoId: null,
                loading: true
            };
        }

        case RecebimentoActions.GET_TRAMITACAO_SUCCESS: {

            return {
                ...state,
                tramitacaoId: action.payload.tramitacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RecebimentoActions.GET_TRAMITACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
