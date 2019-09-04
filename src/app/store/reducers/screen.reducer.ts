import * as ScreenActions from '../actions/screen.action';

export interface ScreenState {
    size: 'string';
}

export const ScreenInitialState: ScreenState = {
    size: null
};

export function ScreenReducer(state = ScreenInitialState, action: ScreenActions.ScreenActionsAll): ScreenState {
    switch (action.type) {

        case ScreenActions.SET_SCREEN: {
            return {
                size: action.payload
            };
        }

        default:
            return state;
    }
}
