import * as EspecieAtividadeEditActions from '../actions/especie-atividade-edit.actions';

export interface EspecieAtividadeEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EspecieAtividadeEditInitialState: EspecieAtividadeEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EspecieAtividadeEditReducer(
    state = EspecieAtividadeEditInitialState,
    action: EspecieAtividadeEditActions.EspecieAtividadeEditActionsAll
): EspecieAtividadeEditState {
    switch (action.type) {

        case EspecieAtividadeEditActions.GET_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case EspecieAtividadeEditActions.GET_ESPECIE_ATIVIDADE_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EspecieAtividadeEditActions.CREATE_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'especieAtividadeHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EspecieAtividadeEditActions.GET_ESPECIE_ATIVIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case EspecieAtividadeEditActions.SAVE_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieAtividadeEditActions.SAVE_ESPECIE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'especieAtividadeHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case EspecieAtividadeEditActions.SAVE_ESPECIE_ATIVIDADE_FAILED: {
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
