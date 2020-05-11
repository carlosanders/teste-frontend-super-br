import * as EspecieTarefaEditActions from '../actions/especie-tarefa-edit.actions';

export interface EspecieTarefaEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EspecieTarefaEditInitialState: EspecieTarefaEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EspecieTarefaEditReducer(
    state = EspecieTarefaEditInitialState,
    action: EspecieTarefaEditActions.EspecieTarefaEditActionsAll
): EspecieTarefaEditState {
    switch (action.type) {

        case EspecieTarefaEditActions.GET_ESPECIE_TAREFA: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case EspecieTarefaEditActions.GET_ESPECIE_TAREFA_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EspecieTarefaEditActions.CREATE_ESPECIE_TAREFA: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'especieTarefaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EspecieTarefaEditActions.GET_ESPECIE_TAREFA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case EspecieTarefaEditActions.SAVE_ESPECIE_TAREFA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieTarefaEditActions.SAVE_ESPECIE_TAREFA_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'especieTarefaHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case EspecieTarefaEditActions.SAVE_ESPECIE_TAREFA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case EspecieTarefaEditActions.SAVE_COLABORADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieTarefaEditActions.SAVE_COLABORADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case EspecieTarefaEditActions.SAVE_COLABORADOR_FAILED: {
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
