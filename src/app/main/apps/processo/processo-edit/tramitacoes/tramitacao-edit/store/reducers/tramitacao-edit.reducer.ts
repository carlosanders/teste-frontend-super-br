import * as TramitacaoEditActions from '../actions/tramitacao-edit.actions';

export interface TramitacaoEditState {
    tramitacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TramitacaoEditInitialState: TramitacaoEditState = {
    tramitacaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TramitacaoEditReducer(
    state = TramitacaoEditInitialState,
    action: TramitacaoEditActions.TramitacaoEditActionsAll
): TramitacaoEditState {
    switch (action.type) {

        case TramitacaoEditActions.GET_TRAMITACAO: {
            return {
                ...state,
                tramitacaoId: null,
                loading: true
            };
        }

        case TramitacaoEditActions.GET_TRAMITACAO_SUCCESS: {

            return {
                ...state,
                tramitacaoId: action.payload.tramitacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TramitacaoEditActions.CREATE_TRAMITACAO: {
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

        case TramitacaoEditActions.GET_TRAMITACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TramitacaoEditActions.SAVE_TRAMITACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TramitacaoEditActions.SAVE_TRAMITACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case TramitacaoEditActions.SAVE_TRAMITACAO_FAILED: {
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
