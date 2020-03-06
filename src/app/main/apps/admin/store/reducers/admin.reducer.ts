import * as AdminActions from '../actions/admin.actions';

export interface AdminState {
    unidadeId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AdminInitialState: AdminState = {
    unidadeId: null,
    errors: false,
    loading: false,
    loaded: false
};

export function AdminReducer(
    state = AdminInitialState,
    action: AdminActions.AdminActionsAll
): AdminState {
    switch (action.type) {

        case AdminActions.GET_SETOR: {
            return {
                ...state,
                unidadeId: null,
                loading: true
            };
        }

        case AdminActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                unidadeId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AdminActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
