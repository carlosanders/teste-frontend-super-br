import * as MercureActions from '../actions/mercure.action';

export interface MercureState {
    type: string;
    content: any;
}

export const MercureInitialState: MercureState = {
    type: null,
    content: null
};

export function MercureReducer(state = MercureInitialState, action: MercureActions.MercureActionsAll): MercureState {
    switch (action.type) {

        case MercureActions.MESSAGE: {
            return {
                type: action.payload.type,
                content: action.payload.content
            };
        }

        case MercureActions.LIMPA_MERCURE: {
            return {
                ...MercureInitialState
            };
        }

        default:
            return state;
    }
}
