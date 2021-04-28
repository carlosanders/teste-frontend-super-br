import * as AvisoEditActions from '../actions/aviso-edit.actions';

export interface AvisoEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const AvisoEditInitialState: AvisoEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function AvisoEditReducer(
    state = AvisoEditInitialState,
    action: AvisoEditActions.AvisoEditActionsAll
): AvisoEditState {
    switch (action.type) {

        case AvisoEditActions.GET_AVISO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case AvisoEditActions.GET_AVISO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AvisoEditActions.CREATE_AVISO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'avisoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case AvisoEditActions.GET_AVISO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
