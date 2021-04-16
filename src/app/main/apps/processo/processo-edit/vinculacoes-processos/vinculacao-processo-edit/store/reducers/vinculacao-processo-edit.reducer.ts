import * as VinculacaoProcessoEditActions from '../actions/vinculacao-processo-edit.actions';

export interface VinculacaoProcessoEditState {
    vinculacaoProcessoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const VinculacaoProcessoEditInitialState: VinculacaoProcessoEditState = {
    vinculacaoProcessoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function VinculacaoProcessoEditReducer(
    state = VinculacaoProcessoEditInitialState,
    action: VinculacaoProcessoEditActions.VinculacaoProcessoEditActionsAll
): VinculacaoProcessoEditState {
    switch (action.type) {

        case VinculacaoProcessoEditActions.GET_VINCULACAO_PROCESSO: {
            return {
                ...VinculacaoProcessoEditInitialState
            };
        }

        case VinculacaoProcessoEditActions.GET_VINCULACAO_PROCESSO_SUCCESS: {

            return {
                ...state,
                vinculacaoProcessoId: action.payload.vinculacaoProcessoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VinculacaoProcessoEditActions.CREATE_VINCULACAO_PROCESSO: {
            return {
                ...state,
                vinculacaoProcessoId: null,
                loaded: {
                    id: 'vinculacaoProcessoHandle',
                    value: 'criar'
                },
                loading: false,
                saving: false
            };
        }

        case VinculacaoProcessoEditActions.GET_VINCULACAO_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        }

        case VinculacaoProcessoEditActions.SAVE_VINCULACAO_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VinculacaoProcessoEditActions.SAVE_VINCULACAO_PROCESSO_SUCCESS: {
            return {
                ...state,
                errors: false,
                saving: false
            };
        }

        case VinculacaoProcessoEditActions.SAVE_VINCULACAO_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case VinculacaoProcessoEditActions.UNLOAD_STORE: {
            return {
                ...VinculacaoProcessoEditInitialState
            };
        }

        default:
            return state;
    }
}
