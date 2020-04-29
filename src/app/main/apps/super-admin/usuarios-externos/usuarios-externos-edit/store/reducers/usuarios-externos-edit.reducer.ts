import * as UsuariosExternosEditActions from '../actions/usuarios-externos-edit.actions';

export interface UsuariosExternosEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const UsuariosExternosEditInitialState: UsuariosExternosEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function UsuariosExternosEditReducer(
    state = UsuariosExternosEditInitialState,
    action: UsuariosExternosEditActions.UsuarioExternosEditActionsAll
): UsuariosExternosEditState {
    switch (action.type) {

        case UsuariosExternosEditActions.GET_USUARIOS_EXTERNOS: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case UsuariosExternosEditActions.GET_USUARIOS_EXTERNOS_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case UsuariosExternosEditActions.GET_USUARIOS_EXTERNOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }


        case UsuariosExternosEditActions.SAVE_USUARIOS_EXTERNOS: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case UsuariosExternosEditActions.SAVE_USUARIOS_EXTERNOS_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'usuariosExternosHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case UsuariosExternosEditActions.SAVE_USUARIOS_EXTERNOS_FAILED: {
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
