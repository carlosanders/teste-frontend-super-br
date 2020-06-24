import * as MunicipioEditActions from '../actions/municipio-edit.actions';

export interface MunicipioEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const MunicipioEditInitialState: MunicipioEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function MunicipioEditReducer(
    state = MunicipioEditInitialState,
    action: MunicipioEditActions.MunicipioEditActionsAll
): MunicipioEditState {
    switch (action.type) {

        case MunicipioEditActions.GET_MUNICIPIO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case MunicipioEditActions.GET_MUNICIPIO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case MunicipioEditActions.CREATE_MUNICIPIO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'municipioHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case MunicipioEditActions.GET_MUNICIPIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case MunicipioEditActions.SAVE_MUNICIPIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case MunicipioEditActions.SAVE_MUNICIPIO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'municipioHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case MunicipioEditActions.SAVE_MUNICIPIO_FAILED: {
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
