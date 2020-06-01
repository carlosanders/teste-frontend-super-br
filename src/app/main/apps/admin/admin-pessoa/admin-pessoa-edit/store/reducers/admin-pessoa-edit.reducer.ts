import * as PessoaEditActions from '../actions/admin-pessoa-edit.actions';

export interface PessoaEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const PessoaEditInitialState: PessoaEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AdminPessoaEditReducer(
    state = PessoaEditInitialState,
    action: PessoaEditActions.PessoaEditActionsAll
): PessoaEditState {
    // noinspection InconsistentLineSeparators,InconsistentLineSeparators
    switch (action.type) {

        case PessoaEditActions.GET_PESSOA: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case PessoaEditActions.GET_PESSOA_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
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
                entityId: action.payload.id,
                loaded: {
                    id: 'pessoaHandle',
                    value: action.payload.id
                },
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
