import * as ModeloEditActions from '../actions/modelo-edit.actions';

export interface ModeloEditDadosBasicosState {
    saving: boolean;
    errors: any;
}

export const ModeloEditInitialState: ModeloEditDadosBasicosState = {
    saving: false,
    errors: false
};

export function ModeloEditDadosBasicosReducer(state = ModeloEditInitialState, action: ModeloEditActions.ModeloEditActionsAll): ModeloEditDadosBasicosState {

    switch (action.type) {

        case ModeloEditActions.SAVE_MODELO: {
            return {
                saving: true,
                errors: false
            };
        }

        case ModeloEditActions.SAVE_MODELO_SUCCESS: {
            return {
                saving: false,
                errors: false
            };
        }

        case ModeloEditActions.SAVE_MODELO_FAILED: {
            return {
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
