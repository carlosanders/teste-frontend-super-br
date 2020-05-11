import * as VinculacaoPessoaUsuarioActions from '../actions/vinculacao-pessoa-usuario.actions';

export interface VinculacaoPessoaUsuarioState {
    vinculacaoPessoaUsuarioId: number;
    usuarioId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const VinculacaoPessoaUsuarioInitialState: VinculacaoPessoaUsuarioState = {
    vinculacaoPessoaUsuarioId: null,
    usuarioId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function VinculacaoPessoaUsuarioReducer(
    state = VinculacaoPessoaUsuarioInitialState,
    action: VinculacaoPessoaUsuarioActions.VinculacaoPessoaUsuarioActionsAll
): VinculacaoPessoaUsuarioState {
    switch (action.type) {

        case VinculacaoPessoaUsuarioActions.GET_VINCULACAO_PESSOA_USUARIO: {
            return {
                ...state,
                vinculacaoPessoaUsuarioId: null,
                usuarioId: null,
                loading: true
            };
        }

        case VinculacaoPessoaUsuarioActions.GET_VINCULACAO_PESSOA_USUARIO_SUCCESS: {

            return {
                ...state,
                vinculacaoPessoaUsuarioId: action.payload.vinculacaoPessoaUsuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VinculacaoPessoaUsuarioActions.GET_VINCULACAO_PESSOA_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
