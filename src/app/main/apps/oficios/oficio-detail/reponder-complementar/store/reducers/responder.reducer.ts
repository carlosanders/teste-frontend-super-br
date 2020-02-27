import * as ResponderActions from '../actions/responder.actions';

export interface ResponderState {
    saving: boolean;
    errors: any;
}

export const ResponderInitialState: ResponderState = {
    saving: false,
    errors: false
};

export function ResponderReducer(state = ResponderInitialState, action: ResponderActions.ResponderActionsAll): ResponderState {
    switch (action.type) {

        case ResponderActions.SAVE_RESPOSTA: {
            return {
                saving: false,
                errors: false
            };
        }

        case ResponderActions.SAVE_RESPOSTA_SUCCESS: {
            return {
                ... state,
                saving: true
            };
        }

        case ResponderActions.SAVE_RESPOSTA_FAILED: {
            return {
                ... state,
                saving: true
            };
        }

        default:
            return state;
    }
}