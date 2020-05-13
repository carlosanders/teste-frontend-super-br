import * as VinculacaoPessoaUsuarioEditActions from '../actions/vinculacao-pessoa-usuario-edit.actions';

export interface VinculacaoPessoaUsuarioEditState {
    vinculacaoPessoaUsuarioId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const VinculacaoPessoaUsuarioEditInitialState: VinculacaoPessoaUsuarioEditState = {
    vinculacaoPessoaUsuarioId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function VinculacaoPessoaUsuarioEditReducer(
    state = VinculacaoPessoaUsuarioEditInitialState,
    action: VinculacaoPessoaUsuarioEditActions.VinculacaoPessoaUsuarioEditActionsAll
): VinculacaoPessoaUsuarioEditState {
    switch (action.type) {
        case VinculacaoPessoaUsuarioEditActions.CREATE_VINCULACAO_PESSOA_USUARIO: {
            return {
                ...state,
                vinculacaoPessoaUsuarioId: null,
                loaded: {
                    id: 'vinculacaoPessoaUsuarioHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case VinculacaoPessoaUsuarioEditActions.SAVE_VINCULACAO_PESSOA_USUARIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VinculacaoPessoaUsuarioEditActions.SAVE_VINCULACAO_PESSOA_USUARIO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case VinculacaoPessoaUsuarioEditActions.SAVE_VINCULACAO_PESSOA_USUARIO_FAILED: {
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
