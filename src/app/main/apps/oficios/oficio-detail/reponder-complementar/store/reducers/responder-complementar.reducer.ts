import * as ResponderComplementarActions from '../actions/responder-complementar.actions';

export interface ResponderComplementarState {
    saving: boolean;
    errors: any;
}

export const ResponderComplementarInitialState: ResponderComplementarState = {
    saving: false,
    errors: false
};

export function ResponderComplementarReducer(state = ResponderComplementarInitialState, action: ResponderComplementarActions.ResponderComplementarActionsAll): ResponderComplementarState {
    switch (action.type) {

        // Resposta
        case ResponderComplementarActions.CREATE_RESPOSTA: {
            return {
                saving: false,
                errors: false
            };
        }

        case ResponderComplementarActions.SAVE_RESPOSTA: {
            return {
                ...state,
                saving: true
            };
        }

        case ResponderComplementarActions.SAVE_RESPOSTA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ResponderComplementarActions.SAVE_RESPOSTA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }
        // Complementar
        case ResponderComplementarActions.CREATE_COMPLEMENTAR: {
            return {
                saving: false,
                errors: false
            };
        }

        case ResponderComplementarActions.SAVE_COMPLEMENTAR: {
            return {
                ...state,
                saving: true
            };
        }

        case ResponderComplementarActions.SAVE_COMPLEMENTAR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ResponderComplementarActions.SAVE_COMPLEMENTAR_FAILED: {
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
