import * as ArquivistaClassificacaoActions from '../actions';

export interface ArquivistaClassificacaoState {
    classificacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ArquivistaClassificacaoInitialState: ArquivistaClassificacaoState = {
    errors: false,
    classificacaoId: null,
    loaded: false,
    loading: false,
    saving: false
}

export function ArquivistaClassificacaoReducer(
    state = ArquivistaClassificacaoInitialState,
    action: ArquivistaClassificacaoActions.ArquivistaClassificacaoActionsAll
): ArquivistaClassificacaoState {
    switch (action.type) {

        case ArquivistaClassificacaoActions.GET_ARQUIVISTA_CLASSIFICACAO : {
            return {
                ...state,
                classificacaoId: null,
                loading: true
            };
        }

        case ArquivistaClassificacaoActions.GET_ARQUIVISTA_CLASSIFICACAO_SUCCESS: {

            return {
                ...state,
                classificacaoId: action.payload.classificacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.UPDATE_ARQUIVISTA_CLASSIFICACAO: {
            return {
                ...state,
                classificacaoId: null,
                loaded: {
                    id: 'classificacaoHandle',
                    value: 'classificacao'
                },
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.GET_ARQUIVISTA_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }

}

