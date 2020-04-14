import * as ModelosEspecieSetorEditActions from '../actions/modelos-especie-setor-edit.actions';

export interface ModelosEspecieSetorEditState {
    vinculacaoModeloId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ModelosEspecieSetorEditInitialState: ModelosEspecieSetorEditState = {
    vinculacaoModeloId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ModelosEspecieSetorEditReducer(
    state = ModelosEspecieSetorEditInitialState,
    action: ModelosEspecieSetorEditActions.ModelosEspecieSetorEditActionsAll
): ModelosEspecieSetorEditState {
    switch (action.type) {

        case ModelosEspecieSetorEditActions.GET_MODELO_ESPECIE_SETOR: {
            return {
                ...state,
                vinculacaoModeloId: null,
                loading: true
            };
        }

        case ModelosEspecieSetorEditActions.GET_MODELO_ESPECIE_SETOR_SUCCESS: {

            return {
                ...state,
                vinculacaoModeloId: action.payload.vinculacaoModeloId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ModelosEspecieSetorEditActions.CREATE_MODELO_ESPECIE_SETOR: {
            return {
                ...state,
                vinculacaoModeloId: null,
                loaded: {
                    id: 'modeloEspecieSetorHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ModelosEspecieSetorEditActions.GET_MODELO_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ModelosEspecieSetorEditActions.SAVE_MODELO_ESPECIE_SETOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ModelosEspecieSetorEditActions.SAVE_MODELO_ESPECIE_SETOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ModelosEspecieSetorEditActions.SAVE_MODELO_ESPECIE_SETOR_FAILED: {
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
