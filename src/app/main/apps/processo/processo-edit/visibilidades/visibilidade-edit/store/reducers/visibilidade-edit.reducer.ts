import * as VisibilidadeEditActions from '../actions/visibilidade-edit.actions';

export interface VisibilidadeEditState {
    visibilidadeId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const visibilidadeEditInitialState: VisibilidadeEditState = {
    visibilidadeId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export const visibilidadeEditReducer = (
    state = visibilidadeEditInitialState,
    action: VisibilidadeEditActions.VisibilidadeEditActionsAll
): VisibilidadeEditState => {
    switch (action.type) {

        case VisibilidadeEditActions.GET_VISIBILIDADE: {
            return {
                ...state,
                visibilidadeId: null,
                loading: true
            };
        }

        case VisibilidadeEditActions.GET_VISIBILIDADE_SUCCESS: {

            return {
                ...state,
                visibilidadeId: action.payload.visibilidadeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VisibilidadeEditActions.CREATE_VISIBILIDADE: {
            return {
                ...state,
                visibilidadeId: null,
                loaded: {
                    id: 'visibilidadeHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case VisibilidadeEditActions.GET_VISIBILIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case VisibilidadeEditActions.SAVE_VISIBILIDADE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VisibilidadeEditActions.SAVE_VISIBILIDADE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case VisibilidadeEditActions.SAVE_VISIBILIDADE_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case VisibilidadeEditActions.UNLOAD_STORE: {
            return {
                ...visibilidadeEditInitialState
            };
        }

        default:
            return state;
    }
}
