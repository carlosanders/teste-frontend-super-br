import * as ProcessoTimelineActions from '../actions';

export interface ProcessoTimelineState {
    loading: boolean;
    loaded: any;
    errors: any;
    list: any[];
}

export const ProcessoTimelineInitialState: ProcessoTimelineState = {
    loading: false,
    loaded: false,
    errors: false,
    list: [],
};

export function ProcessoTimelineReducer(
    state = ProcessoTimelineInitialState,
    action: ProcessoTimelineActions.ProcessoTimelineActionsAll
): ProcessoTimelineState {

    switch (action.type) {

         case ProcessoTimelineActions.GET_TIMELINE: {
                return {
                    ...state,
                    loading: true,
                    loaded: false,
                    errors: false,
                    list: [],
                };
         }

        case ProcessoTimelineActions.GET_TIMELINE_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: {value: action.payload.id, handle: 'processoHandle'},
                errors: false,
                list: (action.payload.data?.entities || []),
            };
        }

        case ProcessoTimelineActions.GET_TIMELINE_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
