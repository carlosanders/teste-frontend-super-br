import * as UpdatePasswordActions from '../actions/update-password.actions';

export interface UpdatePasswordState {
    success: boolean;
    saving: boolean;
    errorMessage: string | null;
}

export const UpdatePasswordInitialState: UpdatePasswordState = {
    success: false,
    saving: false,
    errorMessage: null
};

export function UpdatePasswordReducers(state = UpdatePasswordInitialState, action: UpdatePasswordActions.UpdatePasswordActionsAll): UpdatePasswordState {
    switch (action.type) {
        case UpdatePasswordActions.UPDATE_PASSWORD: {
            return {
                ...state,
                saving: true,
                errorMessage: null
            };
        }
        case UpdatePasswordActions.UPDATE_PASSWORD_SUCCESS: {
            return {
                ...state,
                success: true,
                saving: false,
                errorMessage: null
            };
        }
        case UpdatePasswordActions.UPDATE_PASSWORD_FAILED: {
            return {
                ...state,
                saving: false,
                errorMessage: action.payload.error
            };
        }
        case UpdatePasswordActions.UNLOAD : {
            return {
                ...UpdatePasswordInitialState
            }
        }
        default: {
            return state;
        }
    }
}
