import * as EspecieSetorEditActions from '../actions/especie-setor-edit.actions';

export interface EspecieSetorEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EspecieSetorEditInitialState: EspecieSetorEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EspecieSetorEditReducer(
    state = EspecieSetorEditInitialState,
    action: EspecieSetorEditActions.EspecieSetorEditActionsAll
): EspecieSetorEditState {
    switch (action.type) {

        case EspecieSetorEditActions.GET_ESPECIE_SETOR: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case EspecieSetorEditActions.GET_ESPECIE_SETOR_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EspecieSetorEditActions.CREATE_ESPECIE_SETOR: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'especieSetorHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EspecieSetorEditActions.GET_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case EspecieSetorEditActions.SAVE_ESPECIE_SETOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieSetorEditActions.SAVE_ESPECIE_SETOR_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'especieSetorHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case EspecieSetorEditActions.SAVE_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case EspecieSetorEditActions.SAVE_COLABORADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieSetorEditActions.SAVE_COLABORADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case EspecieSetorEditActions.SAVE_COLABORADOR_FAILED: {
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
