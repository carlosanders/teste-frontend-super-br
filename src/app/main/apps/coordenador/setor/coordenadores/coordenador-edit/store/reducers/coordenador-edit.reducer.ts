import * as CoordenadorEditActions from '../actions/coordenador-edit.actions';

export interface CoordenadorEditState {
    coordenadorId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CoordenadorEditInitialState: CoordenadorEditState = {
    coordenadorId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function CoordenadorEditReducer(
    state = CoordenadorEditInitialState,
    action: CoordenadorEditActions.CoordenadorEditActionsAll
): CoordenadorEditState {
    switch (action.type) {

        case CoordenadorEditActions.GET_COORDENADOR: {
            return {
                ...state,
                coordenadorId: null,
                loading: true
            };
        }

        case CoordenadorEditActions.GET_COORDENADOR_SUCCESS: {

            return {
                ...state,
                coordenadorId: action.payload.coordenadorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CoordenadorEditActions.CREATE_COORDENADOR: {
            return {
                ...state,
                coordenadorId: null,
                loaded: {
                    id: 'coordenadorHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case CoordenadorEditActions.GET_COORDENADOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case CoordenadorEditActions.SAVE_COORDENADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case CoordenadorEditActions.SAVE_COORDENADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case CoordenadorEditActions.SAVE_COORDENADOR_FAILED: {
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
