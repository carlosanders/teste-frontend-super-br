import * as LembreteActions from '../actions';

export interface LembreteState {
    lembreteId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const LembreteInitialState: LembreteState = {
    errors: false,
    lembreteId: null,
    loaded: false,
    loading: false,
    saving: false
}

export function LembreteReducer(
    state = LembreteInitialState,
    action: LembreteActions.LembreteActionsAll
): LembreteState {
    switch (action.type) {

        case LembreteActions.GET_LEMBRETE : {
            return {
                ...state,
                lembreteId: null,
                loading: true
            };
        }

        case LembreteActions.GET_LEMBRETE_SUCCESS: {

            return {
                ...state,
                lembreteId: action.payload.lembreteId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LembreteActions.CREATE_LEMBRETE: {
            return {
                ...state,
                lembreteId: null,
                loaded: {
                    id: 'lembreteHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case LembreteActions.GET_LEMBRETE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LembreteActions.SAVE_LEMBRETE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case LembreteActions.SAVE_LEMBRETE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case LembreteActions.SAVE_LEMBRETE_FAILED: {
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

