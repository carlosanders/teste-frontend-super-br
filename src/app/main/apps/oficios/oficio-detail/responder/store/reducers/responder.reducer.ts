import * as ResponderActions from '../actions/responder.actions';

export interface ResponderState {
    saving: boolean;
    errors: any;
}

export const responderInitialState: ResponderState = {
    saving: false,
    errors: false
};

export const responderReducer = (state = responderInitialState, action: ResponderActions.ResponderActionsAll): ResponderState => {
    switch (action.type) {

        case ResponderActions.SAVE_RESPOSTA: {
            return {
                saving: true,
                errors: false
            };
        }

        case ResponderActions.SAVE_RESPOSTA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ResponderActions.SAVE_RESPOSTA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
};
