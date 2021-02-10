import * as TransicaoEditActions from '../actions/transicao-edit.actions';

export interface TransicaoEditState {
    transicaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TransicaoEditInitialState: TransicaoEditState = {
    transicaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TransicaoEditReducer(
    state = TransicaoEditInitialState,
    action: TransicaoEditActions.TransicaoEditActionsAll
): TransicaoEditState {
    switch (action.type) {

        case TransicaoEditActions.GET_TRANSICAO: {
            return {
                ...state,
                transicaoId: null,
                loading: true
            };
        }

        case TransicaoEditActions.GET_TRANSICAO_SUCCESS: {

            return {
                ...state,
                transicaoId: action.payload.transicaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TransicaoEditActions.CREATE_TRANSICAO: {
            return {
                ...state,
                transicaoId: null,
                loaded: {
                    id: 'transicaoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TransicaoEditActions.GET_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TransicaoEditActions.SAVE_TRANSICAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TransicaoEditActions.SAVE_TRANSICAO_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case TransicaoEditActions.SAVE_TRANSICAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TransicaoEditActions.UNLOAD_STORE: {
            return {
                ...TransicaoEditInitialState
            };
        }

        default:
            return state;
    }
}
