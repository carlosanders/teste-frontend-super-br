import * as ContaEmailEditActions from '../actions/contas-email-edit.actions';

export interface ContaEmailEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ContaEmailEditInitialState: ContaEmailEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ContasEmailEditReducer(
    state = ContaEmailEditInitialState,
    action: ContaEmailEditActions.ContaEmailEditActionsAll
): ContaEmailEditState {
    switch (action.type) {

        case ContaEmailEditActions.GET_CONTA_EMAIL: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case ContaEmailEditActions.GET_CONTA_EMAIL_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ContaEmailEditActions.CREATE_CONTA_EMAIL: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'contaEmailHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ContaEmailEditActions.GET_CONTA_EMAIL_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ContaEmailEditActions.SAVE_CONTA_EMAIL: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ContaEmailEditActions.SAVE_CONTA_EMAIL_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'cargoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case ContaEmailEditActions.SAVE_CONTA_EMAIL_FAILED: {
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
