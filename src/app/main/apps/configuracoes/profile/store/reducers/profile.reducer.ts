import * as ProfileActions from '../actions/profile.actions';

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

export function ProfileReducer(
    state = ProfileInitialState,
    action: ProfileActions.ProfileActionsAll
): ProfileState {
    switch (action.type) {

        case ProfileActions.SAVE_PROFILE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ProfileActions.SAVE_PROFILE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProfileActions.SAVE_PROFILE_FAILED: {
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
