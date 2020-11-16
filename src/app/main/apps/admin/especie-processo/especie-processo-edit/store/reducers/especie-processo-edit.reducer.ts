import * as EspecieProcessoEditActions from '../actions/especie-processo-edit.actions';

export interface EspecieProcessoEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EspecieProcessoEditInitialState: EspecieProcessoEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EspecieProcessoEditReducer(
    state = EspecieProcessoEditInitialState,
    action: EspecieProcessoEditActions.EspecieProcessoEditActionsAll
): EspecieProcessoEditState {
    switch (action.type) {

        case EspecieProcessoEditActions.GET_ESPECIE_PROCESSO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case EspecieProcessoEditActions.GET_ESPECIE_PROCESSO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EspecieProcessoEditActions.CREATE_ESPECIE_PROCESSO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'especieProcessoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EspecieProcessoEditActions.GET_ESPECIE_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case EspecieProcessoEditActions.SAVE_ESPECIE_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieProcessoEditActions.SAVE_ESPECIE_PROCESSO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'especieProcessoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case EspecieProcessoEditActions.SAVE_ESPECIE_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case EspecieProcessoEditActions.SAVE_COLABORADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieProcessoEditActions.SAVE_COLABORADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case EspecieProcessoEditActions.SAVE_COLABORADOR_FAILED: {
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
