import * as CounterActions from '../actions/counter.action';

// tslint:disable-next-line:no-empty-interface
export interface CounterState {
}

export const CounterInitialState: CounterState = {
};

export function CounterReducer(state = CounterInitialState, action: CounterActions.CounterActionsAll): CounterState {
    switch (action.type) {
        case CounterActions.SET_COUNT: {
            const count = {};
            count[action.payload.identifier] = action.payload.count;
            return {
                ...state,
                ...count
            };
        }
        default:
            return state;
    }
}
