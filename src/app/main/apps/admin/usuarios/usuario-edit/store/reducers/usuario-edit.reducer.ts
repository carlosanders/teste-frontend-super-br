import * as UsuarioEditActions from '../actions/usuario-edit.actions';

export interface UsuarioEditState {
    usuarioId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
    nextColaborador: boolean;
}

export const UsuarioEditInitialState: UsuarioEditState = {
    usuarioId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
    nextColaborador: false
};

export function UsuarioEditReducer(
    state = UsuarioEditInitialState,
    action: UsuarioEditActions.UsuarioEditActionsAll
): UsuarioEditState {
    switch (action.type) {

        case UsuarioEditActions.GET_USUARIO: {
            return {
                ...state,
                usuarioId: null,
                loading: true
            };
        }

        case UsuarioEditActions.GET_USUARIO_SUCCESS: {

            return {
                ...state,
                usuarioId: action.payload.usuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case UsuarioEditActions.CREATE_USUARIO: {
            return {
                ...state,
                usuarioId: null,
                loaded: {
                    id: 'usuarioHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case UsuarioEditActions.GET_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case UsuarioEditActions.SAVE_USUARIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case UsuarioEditActions.SAVE_USUARIO_SUCCESS: {
            return {
                ...state,
                usuarioId: action.payload.id,
                loaded: {
                    id: 'usuarioHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false,
                nextColaborador: true
            };
        }

        case UsuarioEditActions.SAVE_USUARIO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case UsuarioEditActions.NEXT_STEP_COLABORADOR_SUCCESS: {
            return {
                ...state,
                nextColaborador: false
            };
        }

        case UsuarioEditActions.SAVE_COLABORADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case UsuarioEditActions.SAVE_COLABORADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case UsuarioEditActions.SAVE_COLABORADOR_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case UsuarioEditActions.UPDATE_USUARIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case UsuarioEditActions.UPDATE_USUARIO_SUCCESS: {
            return {
                ...state,
                usuarioId: action.payload.id,
                loaded: {
                    id: 'usuarioHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case UsuarioEditActions.UPDATE_USUARIO_FAILED: {
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
