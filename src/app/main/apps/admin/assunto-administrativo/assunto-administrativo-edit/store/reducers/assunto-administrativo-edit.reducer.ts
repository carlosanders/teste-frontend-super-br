import * as AssuntoAdministrativoEditActions from '../actions/assunto-administrativo-edit.actions';

export interface AssuntoAdministrativoEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AssuntoAdministrativoEditInitialState: AssuntoAdministrativoEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AssuntoAdministrativoEditReducer(
    state = AssuntoAdministrativoEditInitialState,
    action: AssuntoAdministrativoEditActions.AssuntoAdministrativoEditActionsAll
): AssuntoAdministrativoEditState {
    switch (action.type) {

        case AssuntoAdministrativoEditActions.GET_ASSUNTO_ADMINISTRATIVO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case AssuntoAdministrativoEditActions.GET_ASSUNTO_ADMINISTRATIVO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AssuntoAdministrativoEditActions.CREATE_ASSUNTO_ADMINISTRATIVO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'assuntoAdministrativoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AssuntoAdministrativoEditActions.GET_ASSUNTO_ADMINISTRATIVO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AssuntoAdministrativoEditActions.SAVE_ASSUNTO_ADMINISTRATIVO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AssuntoAdministrativoEditActions.SAVE_ASSUNTO_ADMINISTRATIVO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'assuntoAdministrativoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case AssuntoAdministrativoEditActions.SAVE_ASSUNTO_ADMINISTRATIVO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case AssuntoAdministrativoEditActions.UPDATE_ASSUNTO_ADMINISTRATIVO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AssuntoAdministrativoEditActions.UPDATE_ASSUNTO_ADMINISTRATIVO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'assuntoAdministrativoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case AssuntoAdministrativoEditActions.UPDATE_ASSUNTO_ADMINISTRATIVO_FAILED: {
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
