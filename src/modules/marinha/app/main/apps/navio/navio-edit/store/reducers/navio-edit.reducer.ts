import * as NavioEditActions from '../actions/navio-edit.actions';

export interface NavioEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const NavioEditInitialState: NavioEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function NavioEditReducer(
    state = NavioEditInitialState,
    action: NavioEditActions.NavioEditActionsAll
): NavioEditState {
    switch (action.type) {

        case NavioEditActions.GET_NAVIO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case NavioEditActions.GET_NAVIO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case NavioEditActions.CREATE_NAVIO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'navioHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case NavioEditActions.GET_NAVIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case NavioEditActions.SAVE_NAVIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case NavioEditActions.SAVE_NAVIO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'navioHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case NavioEditActions.SAVE_NAVIO_FAILED: {
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
