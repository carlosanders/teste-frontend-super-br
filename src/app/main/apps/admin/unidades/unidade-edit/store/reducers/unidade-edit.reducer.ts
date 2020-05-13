import * as UnidadeEditActions from '../actions/unidade-edit.actions';

export interface UnidadeEditState {
    setorId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const UnidadeEditInitialState: UnidadeEditState = {
    setorId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function UnidadeEditReducer(
    state = UnidadeEditInitialState,
    action: UnidadeEditActions.UnidadeEditActionsAll
): UnidadeEditState {
    switch (action.type) {

        case UnidadeEditActions.GET_UNIDADE: {
            return {
                ...state,
                setorId: null,
                loading: true
            };
        }

        case UnidadeEditActions.GET_UNIDADE_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case UnidadeEditActions.CREATE_UNIDADE: {
            return {
                ...state,
                setorId: null,
                loaded: {
                    id: 'unidadeHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case UnidadeEditActions.GET_UNIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case UnidadeEditActions.SAVE_UNIDADE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case UnidadeEditActions.SAVE_UNIDADE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case UnidadeEditActions.SAVE_UNIDADE_FAILED: {
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
