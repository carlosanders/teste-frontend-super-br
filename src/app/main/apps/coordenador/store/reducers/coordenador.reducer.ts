import * as CoordenadorActions from '../actions/coordenador.actions';

export interface CoordenadorState {
    setorId: number;
    unidadeId: number;
    orgaoId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CoordenadorInitialState: CoordenadorState = {
    setorId: null,
    unidadeId: null,
    orgaoId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function CoordenadorReducer(
    state = CoordenadorInitialState,
    action: CoordenadorActions.CoordenadorActionsAll
): CoordenadorState {
    switch (action.type) {

        case CoordenadorActions.GET_SETOR: {
            return {
                ...state,
                setorId: null,
                unidadeId: null,
                orgaoId: null,
                loading: true
            };
        }

        case CoordenadorActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CoordenadorActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case CoordenadorActions.GET_UNIDADE: {
            return {
                ...state,
                setorId: null,
                unidadeId: null,
                orgaoId: null,
                loading: true
            };
        }

        case CoordenadorActions.GET_UNIDADE_SUCCESS: {

            return {
                ...state,
                unidadeId: action.payload.unidadeId,
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

        case CoordenadorActions.GET_ORGAO_CENTRAL: {
            return {
                ...state,
                setorId: null,
                unidadeId: null,
                orgaoId: null,
                loading: true
            };
        }

        case CoordenadorActions.GET_ORGAO_CENTRAL_SUCCESS: {

            return {
                ...state,
                orgaoId: action.payload.orgaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CoordenadorActions.GET_ORGAO_CENTRAL_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
