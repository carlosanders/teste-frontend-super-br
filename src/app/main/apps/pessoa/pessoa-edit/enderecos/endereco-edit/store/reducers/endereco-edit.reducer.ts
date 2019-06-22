import * as EnderecoEditActions from '../actions/endereco-edit.actions';

export interface EnderecoEditState {
    enderecoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EnderecoEditInitialState: EnderecoEditState = {
    enderecoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EnderecoEditReducer(
    state = EnderecoEditInitialState,
    action: EnderecoEditActions.EnderecoEditActionsAll
): EnderecoEditState {
    switch (action.type) {

        case EnderecoEditActions.GET_ENDERECO: {
            return {
                ...state,
                enderecoId: null,
                loading: true
            };
        }

        case EnderecoEditActions.GET_ENDERECO_SUCCESS: {

            return {
                ...state,
                enderecoId: action.payload.enderecoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EnderecoEditActions.CREATE_ENDERECO: {
            return {
                ...state,
                enderecoId: null,
                loaded: {
                    id: 'enderecoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EnderecoEditActions.GET_ENDERECO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case EnderecoEditActions.SAVE_ENDERECO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EnderecoEditActions.SAVE_ENDERECO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case EnderecoEditActions.SAVE_ENDERECO_FAILED: {
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
