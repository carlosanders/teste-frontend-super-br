import * as AdminActions from '../actions/admin.actions';

export interface AdminState {
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AdminInitialState: AdminState = {
    errors: false,
    loading: false,
    loaded: false,
};

export function AdminReducer(
    state = AdminInitialState,
    action: AdminActions.AdminActionsAll
): AdminState {
    switch (action.type) {

        case AdminActions.GET_ROLE: {
            return {
                ...state,
                loading: true
            };
        }

        default:
            return state;
    }
}
