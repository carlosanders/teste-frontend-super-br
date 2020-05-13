import * as RootLotacaoEditActions from '../actions/admin-lotacao-edit.actions';

export interface RootLotacaoEditState {
    lotacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RootLotacaoEditInitialState: RootLotacaoEditState = {
    lotacaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AdminLotacaoEditReducer(
    state = RootLotacaoEditInitialState,
    action: RootLotacaoEditActions.RootLotacaoEditActionsAll
): RootLotacaoEditState {
    switch (action.type) {

        case RootLotacaoEditActions.GET_LOTACAO: {
            return {
                ...state,
                lotacaoId: null,
                loading: true
            };
        }

        case RootLotacaoEditActions.GET_LOTACAO_SUCCESS: {

            return {
                ...state,
                lotacaoId: action.payload.lotacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RootLotacaoEditActions.CREATE_LOTACAO: {
            return {
                ...state,
                lotacaoId: null,
                loaded: {
                    id: 'lotacaoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RootLotacaoEditActions.GET_LOTACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RootLotacaoEditActions.SAVE_LOTACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RootLotacaoEditActions.SAVE_LOTACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RootLotacaoEditActions.SAVE_LOTACAO_FAILED: {
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
