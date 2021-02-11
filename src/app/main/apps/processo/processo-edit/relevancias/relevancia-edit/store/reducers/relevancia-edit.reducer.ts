import * as RelevanciaEditActions from '../actions/relevancia-edit.actions';

export interface RelevanciaEditState {
    relevanciaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RelevanciaEditInitialState: RelevanciaEditState = {
    relevanciaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RelevanciaEditReducer(
    state = RelevanciaEditInitialState,
    action: RelevanciaEditActions.RelevanciaEditActionsAll
): RelevanciaEditState {
    switch (action.type) {

        case RelevanciaEditActions.GET_RELEVANCIA: {
            return {
                ...state,
                relevanciaId: null,
                loading: true
            };
        }

        case RelevanciaEditActions.GET_RELEVANCIA_SUCCESS: {

            return {
                ...state,
                relevanciaId: action.payload.relevanciaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RelevanciaEditActions.CREATE_RELEVANCIA: {
            return {
                ...state,
                relevanciaId: null,
                loaded: {
                    id: 'relevanciaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RelevanciaEditActions.GET_RELEVANCIA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RelevanciaEditActions.SAVE_RELEVANCIA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RelevanciaEditActions.SAVE_RELEVANCIA_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case RelevanciaEditActions.SAVE_RELEVANCIA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RelevanciaEditActions.UNLOAD_STORE: {
            return {
                ...RelevanciaEditInitialState
            };
        }

        default:
            return state;
    }
}
