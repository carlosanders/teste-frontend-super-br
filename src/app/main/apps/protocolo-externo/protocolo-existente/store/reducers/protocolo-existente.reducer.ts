import * as ProtocoloExistenteActions from '../actions/protocolo-existente.actions';

export interface ProtocoloExistenteState {
    saving: boolean;
    errors: any;
}

export const ProtocoloExistenteInitialState: ProtocoloExistenteState = {
    saving: false,
    errors: false
};

export function ProtocoloExistenteReducer(state = ProtocoloExistenteInitialState, action: ProtocoloExistenteActions.ProtocoloExistenteActionsAll): ProtocoloExistenteState {
    switch (action.type) {

        case ProtocoloExistenteActions.CREATE_JUNTADA: {
            return {
                saving: false,
                errors: false
            };
        }

        case ProtocoloExistenteActions.SAVE_JUNTADA: {
            return {
                ...state,
                saving: true
            };
        }

        case ProtocoloExistenteActions.SAVE_JUNTADA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProtocoloExistenteActions.SAVE_JUNTADA_FAILED: {
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
