import * as JuntadaActions from '../actions/juntada.actions';

export interface JuntadaState {
    juntadaId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    errors: any;
}

export const JuntadaInitialState: JuntadaState = {
    juntadaId: null,
    loading: false,
    loaded: false,
    saving: false,
    errors: false
};

export function JuntadaReducer(state = JuntadaInitialState, action: JuntadaActions.JuntadaActionsAll): JuntadaState {
    switch (action.type) {

        case JuntadaActions.GET_JUNTADA: {
            return {
                ...JuntadaInitialState
            };
        }

        case JuntadaActions.GET_JUNTADA_SUCCESS: {

            return {
                juntadaId: action.payload.juntadaId,
                loading: false,
                loaded: action.payload.loaded,
                saving: false,
                errors: false
            };
        }

        case JuntadaActions.GET_JUNTADA_FAILED: {
            return {
                juntadaId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false
            };
        }

        case JuntadaActions.SAVE_JUNTADA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case JuntadaActions.SAVE_JUNTADA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case JuntadaActions.SAVE_JUNTADA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case JuntadaActions.UNLAOD_JUNTADA: {
            return {
                ...JuntadaInitialState
            };
        }

        default:
            return state;
    }
}
