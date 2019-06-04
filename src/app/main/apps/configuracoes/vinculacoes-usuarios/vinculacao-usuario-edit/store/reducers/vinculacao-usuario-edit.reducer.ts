import * as VinculacaoUsuarioEditActions from '../actions/vinculacao-usuario-edit.actions';

export interface VinculacaoUsuarioEditState {
    vinculacaoUsuarioId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const VinculacaoUsuarioEditInitialState: VinculacaoUsuarioEditState = {
    vinculacaoUsuarioId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function VinculacaoUsuarioEditReducer(
    state = VinculacaoUsuarioEditInitialState,
    action: VinculacaoUsuarioEditActions.VinculacaoUsuarioEditActionsAll
): VinculacaoUsuarioEditState {
    switch (action.type) {

        case VinculacaoUsuarioEditActions.GET_VINCULACAO_USUARIO: {
            return {
                ...state,
                vinculacaoUsuarioId: null,
                loading: true
            };
        }

        case VinculacaoUsuarioEditActions.GET_VINCULACAO_USUARIO_SUCCESS: {

            return {
                ...state,
                vinculacaoUsuarioId: action.payload.vinculacaoUsuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VinculacaoUsuarioEditActions.CREATE_VINCULACAO_USUARIO: {
            return {
                ...state,
                vinculacaoUsuarioId: null,
                loaded: {
                    id: 'vinculacaoUsuarioHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case VinculacaoUsuarioEditActions.GET_VINCULACAO_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case VinculacaoUsuarioEditActions.SAVE_VINCULACAO_USUARIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VinculacaoUsuarioEditActions.SAVE_VINCULACAO_USUARIO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case VinculacaoUsuarioEditActions.SAVE_VINCULACAO_USUARIO_FAILED: {
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
