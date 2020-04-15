import * as RepositorioEditActions from '../actions/repositorios-edit.actions';

export interface RepositorioEditState {
    repositorioId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RepositorioEditInitialState: RepositorioEditState = {
    repositorioId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RepositoriosEditReducer(
    state = RepositorioEditInitialState,
    action: RepositorioEditActions.RepositorioEditActionsAll
): RepositorioEditState {
    switch (action.type) {

        case RepositorioEditActions.GET_REPOSITORIO: {
            return {
                ...state,
                repositorioId: null,
                loading: true
            };
        }

        case RepositorioEditActions.GET_REPOSITORIO_SUCCESS: {

            return {
                ...state,
                repositorioId: action.payload.repositorioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RepositorioEditActions.CREATE_REPOSITORIO: {
            return {
                ...state,
                repositorioId: null,
                loaded: {
                    id: 'repositorioHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RepositorioEditActions.GET_REPOSITORIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RepositorioEditActions.SAVE_REPOSITORIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RepositorioEditActions.SAVE_REPOSITORIO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RepositorioEditActions.SAVE_REPOSITORIO_FAILED: {
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
