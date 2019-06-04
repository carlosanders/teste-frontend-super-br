import * as ProfileActions from '../actions/perfil.actions';

export interface ProfileState {
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ProfileInitialState: ProfileState = {
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

        default:
            return state;
    }
}
