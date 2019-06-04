import * as PessoaEditActions from '../actions/pessoa-edit.actions';

export interface PessoaEditState {
    pessoaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const PessoaEditInitialState: PessoaEditState = {
    pessoaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function PessoaEditReducer(state = PessoaEditInitialState, action: PessoaEditActions.PessoaEditActionsAll): PessoaEditState {
    switch (action.type) {

        case PessoaEditActions.GET_PESSOA: {
            return {
                ...state,
                pessoaId: null,
                loading: true
            };
        }

        case PessoaEditActions.GET_PESSOA_SUCCESS: {

            return {
                ...state,
                pessoaId: action.payload.pessoaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case PessoaEditActions.CREATE_PESSOA: {
            return {
                ...state,
                pessoaId: null,
                loaded: {
                    id: 'pessoaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case PessoaEditActions.GET_PESSOA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case PessoaEditActions.SAVE_PESSOA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case PessoaEditActions.SAVE_PESSOA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case PessoaEditActions.SAVE_PESSOA_FAILED: {
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
