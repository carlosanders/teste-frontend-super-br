import * as PessoaActions from '../actions';

export interface PessoaState {
    pessoaId: number;
    loading: boolean;
    loaded: boolean;
}

export const PessoaInitialState: PessoaState = {
    pessoaId: null,
    loading: false,
    loaded: false
};

export function PessoaReducer(state = PessoaInitialState, action: PessoaActions.ProcessosActionsAll): PessoaState {
    switch (action.type) {
        case PessoaActions.GET_PESSOA:
            return {
                ...state,
                loading: true,
                loaded: false
            };

        case PessoaActions.GET_PESSOA_SUCCESS:
            return {
                ...state,
                pessoaId: action.payload?.pessoa?.id,
                loading: false,
                loaded: action.payload.loaded
            };

        case PessoaActions.GET_PESSOA_FAILED:
            return {
                ...state,
                loading: false,
                loaded: false
            };

        default:
            return state;
    }
}
