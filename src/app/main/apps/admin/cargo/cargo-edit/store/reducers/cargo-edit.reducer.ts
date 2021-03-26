import * as CargoEditActions from '../actions/cargo-edit.actions';

export interface CargoEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CargoEditInitialState: CargoEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function CargoEditReducer(
    state = CargoEditInitialState,
    action: CargoEditActions.CargoEditActionsAll
): CargoEditState {
    switch (action.type) {

        case CargoEditActions.GET_CARGO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case CargoEditActions.GET_CARGO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CargoEditActions.CREATE_CARGO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'cargoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case CargoEditActions.GET_CARGO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case CargoEditActions.SAVE_CARGO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case CargoEditActions.SAVE_CARGO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'cargoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case CargoEditActions.SAVE_CARGO_FAILED: {
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
