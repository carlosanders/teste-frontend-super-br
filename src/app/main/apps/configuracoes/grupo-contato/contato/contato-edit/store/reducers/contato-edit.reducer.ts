import * as ContatoEditActions from '../actions/contato-edit.actions';

export interface ContatoEditState {
    contatoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ContatoEditInitialState: ContatoEditState = {
    contatoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ContatoEditReducer(
    state = ContatoEditInitialState,
    action: ContatoEditActions.ContatoEditActionsAll
): ContatoEditState {
    switch (action.type) {

        case ContatoEditActions.GET_CONTATO: {
            return {
                ...state,
                contatoId: null,
                loading: true
            };
        }

        case ContatoEditActions.GET_CONTATO_SUCCESS: {

            return {
                ...state,
                contatoId: action.payload.contatoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ContatoEditActions.CREATE_CONTATO: {
            return {
                ...state,
                contatoId: null,
                loaded: {
                    id: 'contatoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ContatoEditActions.GET_CONTATO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ContatoEditActions.SAVE_CONTATO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ContatoEditActions.SAVE_CONTATO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ContatoEditActions.SAVE_CONTATO_FAILED: {
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
