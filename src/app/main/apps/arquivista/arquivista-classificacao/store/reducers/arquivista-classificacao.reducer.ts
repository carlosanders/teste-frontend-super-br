import * as ArquivistaClassificacaoActions from '../actions/arquivista-classificacao.actions';

export interface ArquivistaClassificacaoState {
    classificacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ArquivistaClassificacaoInitialState: ArquivistaClassificacaoState = {
    classificacaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ArquivistaClassificacaoReducer(
    state = ArquivistaClassificacaoInitialState,
    action: ArquivistaClassificacaoActions.ArquivistaClassificacaoActionsAll
): ArquivistaClassificacaoState {
    switch (action.type) {

        case ArquivistaClassificacaoActions.GET_CLASSIFICACAO: {
            return {
                ...state,
                classificacaoId: null,
                loading: true
            };
        }

        case ArquivistaClassificacaoActions.GET_CLASSIFICACAO_SUCCESS: {

            return {
                ...state,
                classificacaoId: action.payload.classificacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.CREATE_CLASSIFICACAO: {
            return {
                ...state,
                classificacaoId: null,
                loaded: {
                    id: 'transicaoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.GET_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_CLASSIFICACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_CLASSIFICACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_CLASSIFICACAO_FAILED: {
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
