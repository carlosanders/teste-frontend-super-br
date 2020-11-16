import * as EnviaEmailActions from '../actions/envia-email.actions';

export interface EnviaEmailState {
    juntadaId: number;
    saving: boolean;
    errors: any;
    loaded: any;
    loading: boolean;
}

export const EnviaEmailInitialState: EnviaEmailState = {
    juntadaId: null,
    saving: false,
    errors: false,
    loaded: false,
    loading: false,
};

export function EnviaEmailReducer(state = EnviaEmailInitialState, action: EnviaEmailActions.EnviaEmailActionsAll): EnviaEmailState {
    switch (action.type) {

        case EnviaEmailActions.GET_JUNTADA: {
            return {
                ...EnviaEmailInitialState
            };
        }

        case EnviaEmailActions.GET_JUNTADA_SUCCESS: {

            return {
                juntadaId: action.payload.juntadaId,
                loading: false,
                loaded: action.payload.loaded,
                saving: false,
                errors: false
            };
        }

        case EnviaEmailActions.GET_JUNTADA_FAILED: {
            return {
                juntadaId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false
            };
        }

        case EnviaEmailActions.ENVIA_EMAIL_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EnviaEmailActions.ENVIA_EMAIL_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case EnviaEmailActions.ENVIA_EMAIL_DOCUMENTO_FAILED: {
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
