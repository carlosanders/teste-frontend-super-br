import * as AfastamentoEditActions from '../actions/afastamento-edit.actions';

export interface AfastamentoEditState {
    afastamentoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AfastamentoEditInitialState: AfastamentoEditState = {
    afastamentoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AfastamentoEditReducer(
    state = AfastamentoEditInitialState,
    action: AfastamentoEditActions.AfastamentoEditActionsAll
): AfastamentoEditState {
    switch (action.type) {

        case AfastamentoEditActions.GET_AFASTAMENTO: {
            return {
                ...state,
                afastamentoId: null,
                loading: true
            };
        }

        case AfastamentoEditActions.GET_AFASTAMENTO_SUCCESS: {

            return {
                ...state,
                afastamentoId: action.payload.afastamentoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AfastamentoEditActions.CREATE_AFASTAMENTO: {
            return {
                ...state,
                afastamentoId: null,
                loaded: {
                    id: 'afastamentoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AfastamentoEditActions.GET_AFASTAMENTO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AfastamentoEditActions.SAVE_AFASTAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AfastamentoEditActions.SAVE_AFASTAMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AfastamentoEditActions.SAVE_AFASTAMENTO_FAILED: {
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
