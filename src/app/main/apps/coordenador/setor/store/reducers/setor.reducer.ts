import * as CoordenadorSetorActions from '../actions/setor.actions';

export interface CoordenadorSetorState {
    unidadeId: number;
    setorId: number;
    errors: any;
    loading: boolean;
    loaded: any;
    loadedUnidade: any;
}

export const CoordenadorSetorInitialState: CoordenadorSetorState = {
    unidadeId: null,
    setorId: null,
    errors: false,
    loading: false,
    loaded: false,
    loadedUnidade: false
};

export function CoordenadorSetorReducer(
    state = CoordenadorSetorInitialState,
    action: CoordenadorSetorActions.CoordenadorSetorActionsAll
): CoordenadorSetorState {
    switch (action.type) {

        case CoordenadorSetorActions.GET_UNIDADE: {
            return {
                ...state,
                setorId: null,
                unidadeId: null,
                loaded: false,
                loading: true
            };
        }

        case CoordenadorSetorActions.GET_UNIDADE_SUCCESS: {

            return {
                ...state,
                unidadeId: action.payload.unidadeId,
                loadedUnidade: action.payload.loaded,
                loading: false
            };
        }

        case CoordenadorSetorActions.GET_UNIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case CoordenadorSetorActions.GET_SETOR: {
            return {
                ...state,
                setorId: null,
                loading: true
            };
        }

        case CoordenadorSetorActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CoordenadorSetorActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
