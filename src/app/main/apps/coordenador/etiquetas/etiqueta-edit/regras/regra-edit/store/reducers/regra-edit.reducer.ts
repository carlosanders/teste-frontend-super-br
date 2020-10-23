import * as RegraEditActions from '../actions/regra-edit.actions';

export interface RegraEditState {
    regraId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RegraEditInitialState: RegraEditState = {
    regraId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RegraEditReducer(
    state = RegraEditInitialState,
    action: RegraEditActions.RegraEditActionsAll
): RegraEditState {
    switch (action.type) {

        case RegraEditActions.GET_REGRA: {
            return {
                ...state,
                regraId: null,
                loading: true
            };
        }

        case RegraEditActions.GET_REGRA_SUCCESS: {

            return {
                ...state,
                regraId: action.payload.regraId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RegraEditActions.CREATE_REGRA: {
            return {
                ...state,
                regraId: null,
                loaded: {
                    id: 'regraHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RegraEditActions.GET_REGRA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RegraEditActions.SAVE_REGRA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RegraEditActions.SAVE_REGRA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RegraEditActions.SAVE_REGRA_FAILED: {
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
