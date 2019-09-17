import * as FavoritoEditActions from '../actions/favorito-edit.actions';

export interface FavoritoEditState {
    favoritoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const FavoritoEditInitialState: FavoritoEditState = {
    favoritoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function FavoritoEditReducer(
    state = FavoritoEditInitialState,
    action: FavoritoEditActions.FavoritoEditActionsAll
): FavoritoEditState {
    switch (action.type) {

        case FavoritoEditActions.GET_FAVORITO: {
            return {
                ...state,
                favoritoId: null,
                loading: true
            };
        }

        case FavoritoEditActions.GET_FAVORITO_SUCCESS: {

            return {
                ...state,
                favoritoId: action.payload.favoritoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case FavoritoEditActions.CREATE_FAVORITO: {
            return {
                ...state,
                favoritoId: null,
                loaded: {
                    id: 'favoritoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case FavoritoEditActions.GET_FAVORITO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case FavoritoEditActions.SAVE_FAVORITO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case FavoritoEditActions.SAVE_FAVORITO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case FavoritoEditActions.SAVE_FAVORITO_FAILED: {
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
