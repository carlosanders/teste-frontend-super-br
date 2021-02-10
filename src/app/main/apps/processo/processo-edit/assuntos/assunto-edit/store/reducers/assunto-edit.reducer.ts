import * as AssuntoEditActions from '../actions/assunto-edit.actions';

export interface AssuntoEditState {
    assuntoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AssuntoEditInitialState: AssuntoEditState = {
    assuntoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AssuntoEditReducer(
    state = AssuntoEditInitialState,
    action: AssuntoEditActions.AssuntoEditActionsAll
): AssuntoEditState {
    switch (action.type) {

        case AssuntoEditActions.GET_ASSUNTO: {
            return {
                ...state,
                assuntoId: null,
                loading: true
            };
        }

        case AssuntoEditActions.GET_ASSUNTO_SUCCESS: {

            return {
                ...state,
                assuntoId: action.payload.assuntoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AssuntoEditActions.CREATE_ASSUNTO: {
            return {
                ...state,
                assuntoId: null,
                loaded: {
                    id: 'assuntoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AssuntoEditActions.GET_ASSUNTO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AssuntoEditActions.SAVE_ASSUNTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AssuntoEditActions.SAVE_ASSUNTO_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case AssuntoEditActions.SAVE_ASSUNTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case AssuntoEditActions.UNLOAD_STORE: {
            return {
                ...AssuntoEditInitialState
            };
        }

        default:
            return state;
    }
}
