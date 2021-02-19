import * as AcompanhamentoEditActions from '../actions/acompanhamento-edit.actions';

export interface AcompanhamentoEditState {
    acompanhamentoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AcompanhamentoEditInitialState: AcompanhamentoEditState = {
    acompanhamentoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AcompanhamentoEditReducer(
    state = AcompanhamentoEditInitialState,
    action: AcompanhamentoEditActions.AcompanhamentoEditActionsAll
): AcompanhamentoEditState {
    switch (action.type) {

        case AcompanhamentoEditActions.GET_ACOMPANHAMENTO: {
            return {
                ...state,
                acompanhamentoId: null,
                loading: true
            };
        }

        case AcompanhamentoEditActions.GET_ACOMPANHAMENTO_SUCCESS: {

            return {
                ...state,
                acompanhamentoId: action.payload.acompanhamentoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AcompanhamentoEditActions.CREATE_ACOMPANHAMENTO: {
            return {
                ...state,
                acompanhamentoId: null,
                loaded: {
                    id: 'targetHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AcompanhamentoEditActions.GET_ACOMPANHAMENTO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AcompanhamentoEditActions.SAVE_ACOMPANHAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AcompanhamentoEditActions.SAVE_ACOMPANHAMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AcompanhamentoEditActions.SAVE_ACOMPANHAMENTO_FAILED: {
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
