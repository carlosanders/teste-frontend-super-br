import * as TransicaoArquivistaBlocoActions from '../actions';

export interface TransicaoArquivistaBlocoState {
    saving: boolean;
    errors: any;
    bufferingTransicao: number;
    transicaoProcessoIds: number[];
    errorTransicao: number[];
}

export const TransicaoArquivistaBlocoInitialState: TransicaoArquivistaBlocoState = {
    errors: false,
    saving: false,
    bufferingTransicao: 0,
    transicaoProcessoIds: [],
    errorTransicao: []
};

export function TransicaoArquivistaBlocoReducer(
    state = TransicaoArquivistaBlocoInitialState,
    action: TransicaoArquivistaBlocoActions.TransicaoArquivistaBlocoActionsAll
): TransicaoArquivistaBlocoState {
    switch (action.type) {

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA: {
            return {
                ...state,
                saving: true,
                errors: false,
                transicaoProcessoIds: [...state.transicaoProcessoIds, action.payload.transicao.processo.id]
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                transicaoProcessoIds: state.transicaoProcessoIds.filter(id => id !== action.payload),
                errorTransicao: [],
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload.error,
                errorTransicao: [...state.errorTransicao, action.payload.id],
                transicaoProcessoIds: state.transicaoProcessoIds.filter(id => id !== action.payload.id),
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_CANCEL: {
            return {
                ...state,
                transicaoProcessoIds: [],
                bufferingTransicao: state.bufferingTransicao + 1,
                errorTransicao: [],
                errors: null
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_FLUSH: {
            return {
                ...state,
                bufferingTransicao: state.bufferingTransicao + 1,
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_CANCEL_SUCCESS: {
            return {
                ...state,
                saving: false,
            };
        }

        default:
            return state;
    }

}

