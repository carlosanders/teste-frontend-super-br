import * as RemessaEditActions from '../actions/remessa-edit.actions';

export interface RemessaEditState {
    tramitacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RemessaEditInitialState: RemessaEditState = {
    tramitacaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RemessaEditReducer(
    state = RemessaEditInitialState,
    action: RemessaEditActions.RemessaEditActionsAll
): RemessaEditState {
    switch (action.type) {

        case RemessaEditActions.GET_TRAMITACAO: {
            return {
                ...state,
                tramitacaoId: null,
                loading: true
            };
        }

        case RemessaEditActions.GET_TRAMITACAO_SUCCESS: {

            return {
                ...state,
                tramitacaoId: action.payload.tramitacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RemessaEditActions.CREATE_TRAMITACAO: {
            return {
                ...state,
                tramitacaoId: null,
                loaded: {
                    id: 'tramitacaoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RemessaEditActions.GET_TRAMITACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RemessaEditActions.SAVE_TRAMITACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RemessaEditActions.SAVE_TRAMITACAO_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case RemessaEditActions.SAVE_TRAMITACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RemessaEditActions.UNLOAD_STORE: {
            return {
                ...RemessaEditInitialState
            };
        }

        default:
            return state;
    }
}
