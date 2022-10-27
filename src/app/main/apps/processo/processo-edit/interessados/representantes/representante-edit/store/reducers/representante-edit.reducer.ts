import * as RepresentanteEditActions from '../actions/representante-edit.actions';

export interface RepresentanteEditState {
    representanteId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RepresentanteEditInitialState: RepresentanteEditState = {
    representanteId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RepresentanteEditReducer(state = RepresentanteEditInitialState, action: RepresentanteEditActions.RepresentanteEditActionsAll): RepresentanteEditState {
    switch (action.type) {

        case RepresentanteEditActions.GET_REPRESENTANTE: {
            return {
                ...state,
                representanteId: null,
                loading: true
            };
        }

        case RepresentanteEditActions.GET_REPRESENTANTE_SUCCESS: {

            return {
                ...state,
                representanteId: action.payload.representanteId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RepresentanteEditActions.CREATE_REPRESENTANTE: {
            return {
                ...state,
                representanteId: null,
                loaded: {
                    id: 'representanteHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RepresentanteEditActions.GET_REPRESENTANTE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RepresentanteEditActions.SAVE_REPRESENTANTE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RepresentanteEditActions.SAVE_REPRESENTANTE_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case RepresentanteEditActions.SAVE_REPRESENTANTE_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RepresentanteEditActions.UNLOAD_STORE: {
            return {
                ...RepresentanteEditInitialState
            };
        }

        default:
            return state;
    }
}
