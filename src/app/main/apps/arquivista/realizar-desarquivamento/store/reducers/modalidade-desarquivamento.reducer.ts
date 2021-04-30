import * as ModalidadeDesarquivamentoActions from '../actions/modalidade-desarquivamento.actions';

export interface ModalidadeDesarquivamentoState {
    modalidadeTransicaoId: number;
    loading: boolean;
    loaded: any;
}

export const ModalidadeDesarquivamentoInitialState: ModalidadeDesarquivamentoState = {
    modalidadeTransicaoId: null,
    loading: false,
    loaded: false,
};

export function ModalidadeDesarquivamentoReducer(state = ModalidadeDesarquivamentoInitialState, action: ModalidadeDesarquivamentoActions.ModalidadeDesarquivamentoActionsAll): ModalidadeDesarquivamentoState {
    switch (action.type) {

        case ModalidadeDesarquivamentoActions.GET_MODALIDADE_TRANSICAO: {
            return {
                ...state,
                modalidadeTransicaoId: null,
                loading: true,
                loaded: null
            };
        }

        case ModalidadeDesarquivamentoActions.GET_MODALIDADE_TRANSICAO_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                loading: false,
                modalidadeTransicaoId: action.payload.modalidadeTransicaoId,
                loaded: loaded
            };
        }

        case ModalidadeDesarquivamentoActions.GET_MODALIDADE_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
