import * as LembreteBlocoActions from '../actions';

export interface LembreteBlocoState {
    lembreteId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const LembreteBlocoInitialState: LembreteBlocoState = {
    errors: false,
    lembreteId: null,
    loaded: false,
    loading: false,
    saving: false
};

export function LembreteBlocoReducer(
    state = LembreteBlocoInitialState,
    action: LembreteBlocoActions.LembreteBlocoActionsAll
): LembreteBlocoState {
    switch (action.type) {

        case LembreteBlocoActions.GET_LEMBRETE_BLOCO : {
            return {
                ...state,
                lembreteId: null,
                loading: true
            };
        }

        case LembreteBlocoActions.GET_LEMBRETE_BLOCO_SUCCESS: {

            return {
                ...state,
                lembreteId: action.payload.lembreteId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LembreteBlocoActions.CREATE_LEMBRETE_BLOCO: {
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

        case LembreteBlocoActions.GET_LEMBRETE_BLOCO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LembreteBlocoActions.SAVE_LEMBRETE_BLOCO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case LembreteBlocoActions.SAVE_LEMBRETE_BLOCO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case LembreteBlocoActions.SAVE_LEMBRETE_BLOCO_FAILED: {
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

