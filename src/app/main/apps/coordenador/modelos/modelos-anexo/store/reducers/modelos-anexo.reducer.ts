import * as ModeloAnexoActions from '../actions/modelos-anexo.actions';

export interface ModeloAnexoState {
    modeloId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ModeloAnexoInitialState: ModeloAnexoState = {
    modeloId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ModelosAnexoReducer(
    state = ModeloAnexoInitialState,
    action: ModeloAnexoActions.ModeloAnexoActionsAll
): ModeloAnexoState {
    switch (action.type) {

        case ModeloAnexoActions.GET_MODELO: {
            return {
                ...state,
                modeloId: null,
                loading: true
            };
        }

        case ModeloAnexoActions.GET_MODELO_SUCCESS: {

            return {
                ...state,
                modeloId: action.payload.modeloId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ModeloAnexoActions.CREATE_MODELO: {
            return {
                ...state,
                modeloId: null,
                loaded: {
                    id: 'modeloHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ModeloAnexoActions.GET_MODELO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ModeloAnexoActions.SAVE_MODELO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ModeloAnexoActions.SAVE_MODELO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ModeloAnexoActions.SAVE_MODELO_FAILED: {
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
