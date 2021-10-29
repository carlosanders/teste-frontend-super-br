import * as fromStore from '../index';

export interface ClassificacaoVisibilidadeEditState {
    visibilidadeId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ClassificacaoVisibilidadeEditInitialState: ClassificacaoVisibilidadeEditState = {
    visibilidadeId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ClassificacaoVisibilidadeEditReducer(
    state = ClassificacaoVisibilidadeEditInitialState,
    action: fromStore.VisibilidadeEditActionsAll
): ClassificacaoVisibilidadeEditState {
    switch (action.type) {

        case fromStore.GET_VISIBILIDADE: {
            return {
                ...state,
                visibilidadeId: null,
                loading: true
            };
        }

        case fromStore.GET_VISIBILIDADE_SUCCESS: {

            return {
                ...state,
                visibilidadeId: action.payload.visibilidadeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case fromStore.CREATE_VISIBILIDADE: {
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

        case fromStore.GET_VISIBILIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case fromStore.SAVE_VISIBILIDADE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case fromStore.SAVE_VISIBILIDADE_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case fromStore.SAVE_VISIBILIDADE_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case fromStore.UNLOAD_STORE: {
            return {
                ...ClassificacaoVisibilidadeEditInitialState
            };
        }

        default:
            return state;
    }
}
