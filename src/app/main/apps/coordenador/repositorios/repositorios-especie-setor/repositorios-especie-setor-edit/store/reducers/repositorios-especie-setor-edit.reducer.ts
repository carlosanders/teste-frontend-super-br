import * as RepositoriosEspecieSetorEditActions from '../actions/repositorios-especie-setor-edit.actions';

export interface RepositoriosEspecieSetorEditState {
    vinculacaoRepositorioId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RepositoriosEspecieSetorEditInitialState: RepositoriosEspecieSetorEditState = {
    vinculacaoRepositorioId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RepositoriosEspecieSetorEditReducer(
    state = RepositoriosEspecieSetorEditInitialState,
    action: RepositoriosEspecieSetorEditActions.RepositoriosEspecieSetorEditActionsAll
): RepositoriosEspecieSetorEditState {
    switch (action.type) {

        case RepositoriosEspecieSetorEditActions.GET_REPOSITORIO_ESPECIE_SETOR: {
            return {
                ...state,
                vinculacaoRepositorioId: null,
                loading: true
            };
        }

        case RepositoriosEspecieSetorEditActions.GET_REPOSITORIO_ESPECIE_SETOR_SUCCESS: {

            return {
                ...state,
                vinculacaoRepositorioId: action.payload.vinculacaoRepositorioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RepositoriosEspecieSetorEditActions.CREATE_REPOSITORIO_ESPECIE_SETOR: {
            return {
                ...state,
                vinculacaoRepositorioId: null,
                loaded: {
                    id: 'repositorioEspecieSetorHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RepositoriosEspecieSetorEditActions.GET_REPOSITORIO_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RepositoriosEspecieSetorEditActions.SAVE_REPOSITORIO_ESPECIE_SETOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RepositoriosEspecieSetorEditActions.SAVE_REPOSITORIO_ESPECIE_SETOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RepositoriosEspecieSetorEditActions.SAVE_REPOSITORIO_ESPECIE_SETOR_FAILED: {
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
