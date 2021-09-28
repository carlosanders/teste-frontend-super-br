import * as ServidorEmailEditActions from '../actions/servidor-email-edit.actions';

export interface ServidorEmailEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ServidorEmailEditInitialState: ServidorEmailEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ServidorEmailEditReducer(
    state = ServidorEmailEditInitialState,
    action: ServidorEmailEditActions.ServidorEmailEditActionsAll
): ServidorEmailEditState {
    switch (action.type) {

        case ServidorEmailEditActions.GET_SERVIDOR_EMAIL: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case ServidorEmailEditActions.GET_SERVIDOR_EMAIL_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ServidorEmailEditActions.CREATE_SERVIDOR_EMAIL: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'servidorEmailHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ServidorEmailEditActions.GET_SERVIDOR_EMAIL_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ServidorEmailEditActions.SAVE_SERVIDOR_EMAIL: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ServidorEmailEditActions.SAVE_SERVIDOR_EMAIL_SUCCESS: {
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

        case ServidorEmailEditActions.SAVE_SERVIDOR_EMAIL_FAILED: {
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
