import * as NomeEditActions from '../actions/nome-edit.actions';

export interface NomeEditState {
    nomeId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const NomeEditInitialState: NomeEditState = {
    nomeId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function NomeEditReducer(
    state = NomeEditInitialState,
    action: NomeEditActions.NomeEditActionsAll
): NomeEditState {
    switch (action.type) {

        case NomeEditActions.GET_NOME: {
            return {
                ...state,
                nomeId: null,
                loading: true
            };
        }

        case NomeEditActions.GET_NOME_SUCCESS: {

            return {
                ...state,
                nomeId: action.payload.nomeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case NomeEditActions.CREATE_NOME: {
            return {
                ...state,
                nomeId: null,
                loaded: {
                    id: 'nomeHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case NomeEditActions.GET_NOME_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case NomeEditActions.SAVE_NOME: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case NomeEditActions.SAVE_NOME_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case NomeEditActions.SAVE_NOME_FAILED: {
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
