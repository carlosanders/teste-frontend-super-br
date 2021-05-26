import * as ProfileActions from '../actions/perfil.actions';

export interface ProfileState {
    imgPerfilId: number;
    imgChancelaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ProfileInitialState: ProfileState = {
    imgPerfilId: null,
    imgChancelaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function PerfilReducer(
    state = ProfileInitialState,
    action: ProfileActions.ProfileActionsAll
): ProfileState {
    switch (action.type) {

        case ProfileActions.SAVE_PERFIL: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ProfileActions.SAVE_PERFIL_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProfileActions.SAVE_PERFIL_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ProfileActions.UPLOAD_IMAGEM_PERFIL: {
            return {
                ...state,
                imgPerfilId: null,
                saving: true,
                errors: false
            };
        }

        case ProfileActions.UPLOAD_IMAGEM_PERFIL_SUCCESS: {
            return {
                ...state,
                imgPerfilId: action.payload.id,
                saving: false,
                errors: false
            };
        }

        case ProfileActions.UPLOAD_IMAGEM_PERFIL_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ProfileActions.UPLOAD_IMAGEM_CHANCELA: {
            return {
                ...state,
                imgChancelaId: null,
                saving: true,
                errors: false
            };
        }

        case ProfileActions.UPLOAD_IMAGEM_CHANCELA_SUCCESS: {
            return {
                ...state,
                imgChancelaId: action.payload.id,
                saving: false,
                errors: false
            };
        }

        case ProfileActions.UPLOAD_IMAGEM_CHANCELA_FAILED: {
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
