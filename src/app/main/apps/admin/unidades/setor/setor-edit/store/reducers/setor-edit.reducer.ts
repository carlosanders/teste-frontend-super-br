import * as SetorEditActions from '../actions/setor-edit.actions';

export interface SetorEditState {
    setorId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const SetorEditInitialState: SetorEditState = {
    setorId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function SetorEditReducer(
    state = SetorEditInitialState,
    action: SetorEditActions.SetorEditActionsAll
): SetorEditState {
    switch (action.type) {

        case SetorEditActions.GET_SETOR: {
            return {
                ...state,
                setorId: null,
                loading: true
            };
        }

        case SetorEditActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case SetorEditActions.CREATE_SETOR: {
            return {
                ...state,
                setorId: null,
                loaded: {
                    id: 'setorHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case SetorEditActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case SetorEditActions.SAVE_SETOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case SetorEditActions.SAVE_SETOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case SetorEditActions.SAVE_SETOR_FAILED: {
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
