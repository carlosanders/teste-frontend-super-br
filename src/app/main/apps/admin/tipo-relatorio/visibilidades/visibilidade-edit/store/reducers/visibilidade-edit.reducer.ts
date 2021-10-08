import * as VisibilidadeEditActions from '../actions/visibilidade-edit.actions';

export interface VisibilidadeEditState {
    visibilidadeId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const VisibilidadeEditInitialState: VisibilidadeEditState = {
    visibilidadeId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function VisibilidadeEditReducer(
    state = VisibilidadeEditInitialState,
    action: VisibilidadeEditActions.VisibilidadeEditActionsAll
): VisibilidadeEditState {
    switch (action.type) {

        case VisibilidadeEditActions.GET_VISIBILIDADE_TIPO_RELATORIO: {
            return {
                ...state,
                visibilidadeId: null,
                loading: true
            };
        }

        case VisibilidadeEditActions.GET_VISIBILIDADE_TIPO_RELATORIO_SUCCESS: {

            return {
                ...state,
                visibilidadeId: action.payload.visibilidadeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VisibilidadeEditActions.CREATE_VISIBILIDADE_TIPO_RELATORIO: {
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

        case VisibilidadeEditActions.GET_VISIBILIDADE_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case VisibilidadeEditActions.SAVE_VISIBILIDADE_TIPO_RELATORIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VisibilidadeEditActions.SAVE_VISIBILIDADE_TIPO_RELATORIO_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case VisibilidadeEditActions.SAVE_VISIBILIDADE_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case VisibilidadeEditActions.UNLOAD_STORE: {
            return {
                ...VisibilidadeEditInitialState
            };
        }

        default:
            return state;
    }
}
