import * as GarantiaEditActions from '../actions/garantia-edit.actions';

export interface GarantiaEditState {
    garantiaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const GarantiaEditInitialState: GarantiaEditState = {
    garantiaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function GarantiaEditReducer(
    state = GarantiaEditInitialState,
    action: GarantiaEditActions.GarantiaEditActionsAll
): GarantiaEditState {
    switch (action.type) {

        case GarantiaEditActions.GET_GARANTIA: {
            return {
                ...state,
                garantiaId: null,
                loading: true
            };
        }

        case GarantiaEditActions.GET_GARANTIA_SUCCESS: {

            return {
                ...state,
                garantiaId: action.payload.garantiaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case GarantiaEditActions.CREATE_GARANTIA: {
            return {
                ...state,
                garantiaId: null,
                loaded: {
                    id: 'garantiaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case GarantiaEditActions.GET_GARANTIA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case GarantiaEditActions.SAVE_GARANTIA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case GarantiaEditActions.SAVE_GARANTIA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case GarantiaEditActions.SAVE_GARANTIA_FAILED: {
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
