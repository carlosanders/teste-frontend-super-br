import * as AcaoEditActions from '../actions/acao-edit.actions';

export interface AcaoEditState {
    acaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AcaoEditInitialState: AcaoEditState = {
    acaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AcaoEditReducer(
    state = AcaoEditInitialState,
    action: AcaoEditActions.AcaoEditActionsAll
): AcaoEditState {
    switch (action.type) {

        case AcaoEditActions.GET_ACAO: {
            return {
                ...state,
                acaoId: null,
                loading: true
            };
        }

        case AcaoEditActions.GET_ACAO_SUCCESS: {

            return {
                ...state,
                acaoId: action.payload.acaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AcaoEditActions.CREATE_ACAO: {
            return {
                ...state,
                acaoId: null,
                loaded: {
                    id: 'acaoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AcaoEditActions.GET_ACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AcaoEditActions.SAVE_ACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AcaoEditActions.SAVE_ACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AcaoEditActions.SAVE_ACAO_FAILED: {
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
