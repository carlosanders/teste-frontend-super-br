import * as RolesActions from '../actions/roles.actions';

export interface RolesState {
    usuarioId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RolesInitialState: RolesState = {
    usuarioId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function RolesReducer(
    state = RolesInitialState,
    action: RolesActions.RolesActionsAll
): RolesState {
    switch (action.type) {

        case RolesActions.GET_USUARIO: {
            return {
                ...state,
                usuarioId: null,
                loading: true
            };
        }

        case RolesActions.GET_USUARIO_SUCCESS: {

            return {
                ...state,
                usuarioId: action.payload.usuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RolesActions.GET_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
