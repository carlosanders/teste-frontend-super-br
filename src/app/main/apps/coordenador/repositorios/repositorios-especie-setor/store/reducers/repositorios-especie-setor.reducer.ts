import * as RepositoriosEspecieSetorActions from '../actions/repositorios-especie-setor.actions';

export interface RepositoriosEspecieSetorState {
    repositorioId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RepositoriosEspecieSetorInitialState: RepositoriosEspecieSetorState = {
    repositorioId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function RepositoriosEspecieSetorReducer(
    state = RepositoriosEspecieSetorInitialState,
    action: RepositoriosEspecieSetorActions.RepositoriosEspecieSetorActionsAll
): RepositoriosEspecieSetorState {
    switch (action.type) {

        case RepositoriosEspecieSetorActions.GET_REPOSITORIO: {
            return {
                ...state,
                repositorioId: null,
                loading: true
            };
        }

        case RepositoriosEspecieSetorActions.GET_REPOSITORIO_SUCCESS: {

            return {
                ...state,
                repositorioId: action.payload.repositorioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RepositoriosEspecieSetorActions.GET_REPOSITORIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
