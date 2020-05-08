import * as EspecieRelevanciaEditActions from '../actions/especie-relevancia-edit.actions';

export interface EspecieRelevanciaEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EspecieRelevanciaEditInitialState: EspecieRelevanciaEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EspecieRelevanciaEditReducer(
    state = EspecieRelevanciaEditInitialState,
    action: EspecieRelevanciaEditActions.EspecieRelevanciaEditActionsAll
): EspecieRelevanciaEditState {
    switch (action.type) {

        case EspecieRelevanciaEditActions.GET_ESPECIE_RELEVANCIA: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case EspecieRelevanciaEditActions.GET_ESPECIE_RELEVANCIA_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EspecieRelevanciaEditActions.CREATE_ESPECIE_RELEVANCIA: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'especieRelevanciaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EspecieRelevanciaEditActions.GET_ESPECIE_RELEVANCIA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case EspecieRelevanciaEditActions.SAVE_ESPECIE_RELEVANCIA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieRelevanciaEditActions.SAVE_ESPECIE_RELEVANCIA_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'especieRelevanciaHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case EspecieRelevanciaEditActions.SAVE_ESPECIE_RELEVANCIA_FAILED: {
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
