import * as AdminModeloEditActions from '../actions/modelo-edit.actions';

export interface AdminModeloEditState {
    modeloId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AdminModeloEditInitialState: AdminModeloEditState = {
    modeloId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AdminModeloEditReducer(
    state = AdminModeloEditInitialState,
    action: AdminModeloEditActions.AdminModeloEditActionsAll
): AdminModeloEditState {
    switch (action.type) {

        case AdminModeloEditActions.GET_MODELO: {
            return {
                ...state,
                modeloId: null,
                loading: true
            };
        }

        case AdminModeloEditActions.GET_MODELO_SUCCESS: {

            return {
                ...state,
                modeloId: action.payload.modeloId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AdminModeloEditActions.CREATE_MODELO: {
            return {
                ...state,
                modeloId: null,
                loaded: {
                    id: 'modeloHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AdminModeloEditActions.GET_MODELO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AdminModeloEditActions.SAVE_MODELO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AdminModeloEditActions.SAVE_MODELO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AdminModeloEditActions.SAVE_MODELO_FAILED: {
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
