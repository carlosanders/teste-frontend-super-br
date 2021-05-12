import * as ModalidadeTransicaoActions from '../actions/modalidade-transicao.actions';

export interface ModalidadeTransicaoState {
    modalidadeTransicaoId: number;
    loading: boolean;
    loaded: any;
}

export const ModalidadeTransicaoInitialState: ModalidadeTransicaoState = {
    modalidadeTransicaoId: null,
    loading: false,
    loaded: false,
};

export function ModalidadeTransicaoReducer(state = ModalidadeTransicaoInitialState, action: ModalidadeTransicaoActions.ModalidadeTransicaoActionsAll): ModalidadeTransicaoState {
    switch (action.type) {

        case ModalidadeTransicaoActions.GET_MODALIDADE_TRANSICAO: {
            return {
                ...state,
                modalidadeTransicaoId: null,
                loading: true,
                loaded: null
            };
        }

        case ModalidadeTransicaoActions.GET_MODALIDADE_TRANSICAO_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                loading: false,
                modalidadeTransicaoId: action.payload.modalidadeTransicaoId,
                loaded: loaded
            };
        }

        case ModalidadeTransicaoActions.GET_MODALIDADE_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ModalidadeTransicaoActions.UNLOAD_MODALIDADE_TRANSICAO: {
            return {
                ...ModalidadeTransicaoInitialState
            };
        }

        default:
            return state;
    }
}
