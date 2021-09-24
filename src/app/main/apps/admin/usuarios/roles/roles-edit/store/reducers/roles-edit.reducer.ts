import * as RoleEditActions from '../actions/roles-edit.actions';

export interface RoleEditState {
    roleId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RoleEditInitialState: RoleEditState = {
    roleId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RolesEditReducer(
    state = RoleEditInitialState,
    action: RoleEditActions.RoleEditActionsAll
): RoleEditState {
    switch (action.type) {

        case RoleEditActions.GET_ROLE: {
            return {
                ...state,
                roleId: null,
                loading: true
            };
        }

        case RoleEditActions.GET_ROLE_SUCCESS: {

            return {
                ...state,
                roleId: action.payload.roleId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RoleEditActions.CREATE_ROLE: {
            return {
                ...state,
                roleId: null,
                loaded: {
                    id: 'roleHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RoleEditActions.GET_ROLE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RoleEditActions.SAVE_ROLE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RoleEditActions.SAVE_ROLE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RoleEditActions.SAVE_ROLE_FAILED: {
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
