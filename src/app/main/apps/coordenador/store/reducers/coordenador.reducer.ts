import * as CoordenadorActions from '../actions/coordenador.actions';

export interface CoordenadorState {
    unidadeId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CoordenadorInitialState: CoordenadorState = {
    unidadeId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function CoordenadorReducer(
    state = CoordenadorInitialState,
    action: CoordenadorActions.CoordenadorActionsAll
): CoordenadorState {
    switch (action.type) {

        case CoordenadorActions.GET_UNIDADE: {
            return {
                ...state,
                unidadeId: null,
                loading: true
            };
        }

        case CoordenadorActions.GET_UNIDADE_SUCCESS: {

            return {
                ...state,
                unidadeId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CoordenadorActions.GET_UNIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
