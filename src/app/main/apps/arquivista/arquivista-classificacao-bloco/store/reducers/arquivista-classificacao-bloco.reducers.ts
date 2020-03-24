import * as ArquivistaClassificacaoBlocoActions from '../actions';

export interface ArquivistaClassificacaoBlocoState {
    classificacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ArquivistaClassificacaoBlocoInitialState: ArquivistaClassificacaoBlocoState = {
    errors: false,
    classificacaoId: null,
    loaded: false,
    loading: false,
    saving: false
}

export function ArquivistaClassificacaoBlocoReducer(
    state = ArquivistaClassificacaoBlocoInitialState,
    action: ArquivistaClassificacaoBlocoActions.ArquivistaClassificacaoBlocoActionsAll
): ArquivistaClassificacaoBlocoState {
    switch (action.type) {

        case ArquivistaClassificacaoBlocoActions.GET_ARQUIVISTA_CLASSIFICACAO_BLOCO : {
            return {
                ...state,
                classificacaoId: null,
                loading: true
            };
        }

        case ArquivistaClassificacaoBlocoActions.GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS: {

            return {
                ...state,
                classificacaoId: action.payload.classificacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.UPDATE_ARQUIVISTA_CLASSIFICACAO_BLOCO: {
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

        case ArquivistaClassificacaoBlocoActions.GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED: {
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

