import * as ModeloEditActions from '../actions/modelo-edit.actions';

export interface ModeloEditState {
    modeloId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ModeloEditInitialState: ModeloEditState = {
    modeloId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function ModeloEditReducer(
    state = ModeloEditInitialState,
    action: ModeloEditActions.ModeloEditActionsAll
): ModeloEditState {
    switch (action.type) {
        case ModeloEditActions.GET_MODELO: {
            return {
                ...state,
                modeloId: null,
                loading: true,
            };
        }

        case ModeloEditActions.GET_MODELO_SUCCESS: {
            return {
                ...state,
                modeloId: action.payload.modeloId,
                loaded: action.payload.loaded,
                loading: false,
            };
        }

        case ModeloEditActions.CREATE_MODELO: {
            return {
                ...state,
                modeloId: null,
                loaded: {
                    id: 'modeloHandle',
                    value: 'criar',
                },
                loading: false,
            };
        }

        case ModeloEditActions.GET_MODELO_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }

        case ModeloEditActions.SAVE_MODELO: {
            // eslint-disable-next-line no-debugger
            debugger;
            return {
                ...state,
                saving: true,
                errors: false,
            };
        }

        case ModeloEditActions.SAVE_MODELO_SUCCESS: {
            // eslint-disable-next-line no-debugger
            debugger;
            return {
                ...state,
                saving: false,
                errors: false,
            };
        }

        case ModeloEditActions.SAVE_MODELO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
            };
        }

        default:
            return state;
    }
}
