import * as JuntadasActions from '../actions/juntadas.actions';

export interface JuntadasState {
    loading: boolean;
    errors: any;
}

export const juntadasInitialState: JuntadasState = {
    loading: false,
    errors: false
};

export const juntadasReducer = (state = juntadasInitialState, action: JuntadasActions.JuntadasActionsAll): JuntadasState => {
    switch (action.type) {
        case JuntadasActions.GET_JUNTADA: {
            return {
                ...state,
                loading: true
            };
        }

        case JuntadasActions.GET_JUNTADA_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case JuntadasActions.GET_JUNTADA_FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
};
