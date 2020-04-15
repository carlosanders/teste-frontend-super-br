import * as ModelosEspecieSetorActions from '../actions/modelos-especie-setor.actions';

export interface ModelosEspecieSetorState {
    modeloId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ModelosEspecieSetorInitialState: ModelosEspecieSetorState = {
    modeloId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function ModelosEspecieSetorReducer(
    state = ModelosEspecieSetorInitialState,
    action: ModelosEspecieSetorActions.ModelosEspecieSetorActionsAll
): ModelosEspecieSetorState {
    switch (action.type) {

        case ModelosEspecieSetorActions.GET_MODELO: {
            return {
                ...state,
                modeloId: null,
                loading: true
            };
        }

        case ModelosEspecieSetorActions.GET_MODELO_SUCCESS: {

            return {
                ...state,
                modeloId: action.payload.modeloId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ModelosEspecieSetorActions.GET_MODELO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
