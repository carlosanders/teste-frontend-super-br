import * as SigiloEditActions from '../actions/sigilo-edit.actions';

export interface SigiloEditState {
    sigiloId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const SigiloEditInitialState: SigiloEditState = {
    sigiloId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function SigiloEditReducer(
    state = SigiloEditInitialState,
    action: SigiloEditActions.SigiloEditActionsAll
): SigiloEditState {
    switch (action.type) {

        case SigiloEditActions.GET_SIGILO: {
            return {
                ...state,
                sigiloId: null,
                loading: true
            };
        }

        case SigiloEditActions.GET_SIGILO_SUCCESS: {

            return {
                ...state,
                sigiloId: action.payload.sigiloId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case SigiloEditActions.CREATE_SIGILO: {
            return {
                ...state,
                sigiloId: null,
                loaded: {
                    id: 'sigiloHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case SigiloEditActions.GET_SIGILO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case SigiloEditActions.SAVE_SIGILO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case SigiloEditActions.SAVE_SIGILO_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case SigiloEditActions.SAVE_SIGILO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case SigiloEditActions.UNLOAD_STORE: {
            return {
                ...SigiloEditInitialState
            };
        }

        default:
            return state;
    }
}
