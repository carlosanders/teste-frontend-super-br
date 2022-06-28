import * as ProtocoloCreateActions from '../actions/protocolo-create.actions';

export interface ProtocoloCreateState {
    saving: boolean;
    errors: any;
}

export const ProtocoloCreateInitialState: ProtocoloCreateState = {
    saving: false,
    errors: false
};

export function ProtocoloCreateReducer(state = ProtocoloCreateInitialState, action: ProtocoloCreateActions.ProtocoloCreateActionsAll): ProtocoloCreateState {
    switch (action.type) {

        case ProtocoloCreateActions.CREATE_PROCESSO: {
            return {
                saving: false,
                errors: false
            };
        }

        case ProtocoloCreateActions.SAVE_PROCESSO: {
            return {
                ...state,
                saving: true
            };
        }

        case ProtocoloCreateActions.SAVE_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProtocoloCreateActions.SAVE_PROCESSO_FAILED: {
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
