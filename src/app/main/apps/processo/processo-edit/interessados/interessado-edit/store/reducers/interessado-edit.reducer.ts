import * as InteressadoEditActions
    from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store/actions/interessado-edit.actions';

export interface InteressadoEditState {
    interessadoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const InteressadoEditInitialState: InteressadoEditState = {
    interessadoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function InteressadoEditReducer(state = InteressadoEditInitialState, action: InteressadoEditActions.InteressadoEditActionsAll): InteressadoEditState {
    switch (action.type) {

        case InteressadoEditActions.GET_INTERESSADO: {
            return {
                ...state,
                interessadoId: null,
                loading: true
            };
        }

        case InteressadoEditActions.GET_INTERESSADO_SUCCESS: {

            return {
                ...state,
                interessadoId: action.payload.interessadoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case InteressadoEditActions.CREATE_INTERESSADO: {
            return {
                ...state,
                interessadoId: null,
                loaded: {
                    id: 'interessadoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case InteressadoEditActions.GET_INTERESSADO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case InteressadoEditActions.SAVE_INTERESSADO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case InteressadoEditActions.SAVE_INTERESSADO_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case InteressadoEditActions.SAVE_INTERESSADO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case InteressadoEditActions.UNLOAD_STORE: {
            return {
                ...InteressadoEditInitialState
            };
        }

        default:
            return state;
    }
}
