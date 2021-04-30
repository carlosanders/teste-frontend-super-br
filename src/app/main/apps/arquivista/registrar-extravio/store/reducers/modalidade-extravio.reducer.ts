import * as ModalidadeExtravioActions from '../actions/modalidade-extravio.actions';

export interface ModalidadeExtravioState {
    modalidadeTransicaoId: number;
    loading: boolean;
    loaded: any;
}

export const ModalidadeExtravioInitialState: ModalidadeExtravioState = {
    modalidadeTransicaoId: null,
    loading: false,
    loaded: false,
};

export function ModalidadeExtravioReducer(state = ModalidadeExtravioInitialState, action: ModalidadeExtravioActions.ModalidadeExtravioActionsAll): ModalidadeExtravioState {
    switch (action.type) {

        case ModalidadeExtravioActions.GET_MODALIDADE_TRANSICAO: {
            return {
                ...state,
                modalidadeTransicaoId: null,
                loading: true,
                loaded: null
            };
        }

        case ModalidadeExtravioActions.GET_MODALIDADE_TRANSICAO_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                loading: false,
                modalidadeTransicaoId: action.payload.modalidadeTransicaoId,
                loaded: loaded
            };
        }

        case ModalidadeExtravioActions.GET_MODALIDADE_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
