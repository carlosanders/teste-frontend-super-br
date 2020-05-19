import * as LotacaoEditActions from '../actions/coordenador-lotacao-edit.actions';

export interface LotacaoEditState {
    lotacaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const LotacaoEditInitialState: LotacaoEditState = {
    lotacaoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function CoordenadorLotacaoEditReducer(
    state = LotacaoEditInitialState,
    action: LotacaoEditActions.LotacaoEditActionsAll
): LotacaoEditState {
    switch (action.type) {

        case LotacaoEditActions.GET_LOTACAO: {
            return {
                ...state,
                lotacaoId: null,
                loading: true
            };
        }

        case LotacaoEditActions.GET_LOTACAO_SUCCESS: {

            return {
                ...state,
                lotacaoId: action.payload.lotacaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LotacaoEditActions.CREATE_LOTACAO: {
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

        case LotacaoEditActions.GET_LOTACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LotacaoEditActions.SAVE_LOTACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case LotacaoEditActions.SAVE_LOTACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case LotacaoEditActions.SAVE_LOTACAO_FAILED: {
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
