import * as VinculacaoPessoaBarramentoEditActions from '../actions/vinculacao-pessoa-barramento-edit.actions';

export interface VinculacaoPessoaBarramentoEditState {
    vinculacaoPessoaBarramentoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const VinculacaoPessoaBarramentoEditInitialState: VinculacaoPessoaBarramentoEditState = {
    vinculacaoPessoaBarramentoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function VinculacaoPessoaBarramentoEditReducer(
    state = VinculacaoPessoaBarramentoEditInitialState,
    action: VinculacaoPessoaBarramentoEditActions.VinculacaoPessoaBarramentoEditActionsAll
): VinculacaoPessoaBarramentoEditState {
    switch (action.type) {

        case VinculacaoPessoaBarramentoEditActions.GET_VINCULACAO_PESSOA_BARRAMENTO: {
            return {
                ...state,
                vinculacaoPessoaBarramentoId: null,
                loading: true
            };
        }

        case VinculacaoPessoaBarramentoEditActions.GET_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS: {

            return {
                ...state,
                vinculacaoPessoaBarramentoId: action.payload.vinculacaoPessoaBarramentoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VinculacaoPessoaBarramentoEditActions.CREATE_VINCULACAO_PESSOA_BARRAMENTO: {
            return {
                ...state,
                vinculacaoPessoaBarramentoId: null,
                loaded: {
                    id: 'vinculacaoPessoaBarramentoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case VinculacaoPessoaBarramentoEditActions.GET_VINCULACAO_PESSOA_BARRAMENTO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case VinculacaoPessoaBarramentoEditActions.SAVE_VINCULACAO_PESSOA_BARRAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VinculacaoPessoaBarramentoEditActions.SAVE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case VinculacaoPessoaBarramentoEditActions.SAVE_VINCULACAO_PESSOA_BARRAMENTO_FAILED: {
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
