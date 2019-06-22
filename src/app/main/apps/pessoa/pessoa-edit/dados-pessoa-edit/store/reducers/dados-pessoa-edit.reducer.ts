import * as DadosPessoaEditActions from '../actions/dados-pessoa-edit.actions';

export interface DadosPessoaEditState {
    pessoaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const DadosPessoaEditInitialState: DadosPessoaEditState = {
    pessoaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function DadosPessoaEditReducer(state = DadosPessoaEditInitialState, action: DadosPessoaEditActions.DadosPessoaEditActionsAll): DadosPessoaEditState {
    switch (action.type) {

        case DadosPessoaEditActions.GET_PESSOA: {
            return {
                ...state,
                pessoaId: null,
                loading: true
            };
        }

        case DadosPessoaEditActions.GET_PESSOA_SUCCESS: {

            return {
                ...state,
                pessoaId: action.payload.pessoaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case DadosPessoaEditActions.CREATE_PESSOA: {
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

        case DadosPessoaEditActions.GET_PESSOA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DadosPessoaEditActions.SAVE_PESSOA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DadosPessoaEditActions.SAVE_PESSOA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DadosPessoaEditActions.SAVE_PESSOA_FAILED: {
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
