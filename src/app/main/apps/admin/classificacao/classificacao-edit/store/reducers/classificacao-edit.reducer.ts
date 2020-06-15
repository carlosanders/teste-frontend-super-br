import * as ClassificacaoEditActions from '../actions/classificacao-edit.actions';

export interface ClassificacaoEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ClassificacaoEditInitialState: ClassificacaoEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ClassificacaoEditReducer(
    state = ClassificacaoEditInitialState,
    action: ClassificacaoEditActions.ClassificacaoEditActionsAll
): ClassificacaoEditState {
    switch (action.type) {

        case ClassificacaoEditActions.GET_CLASSIFICACAO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case ClassificacaoEditActions.GET_CLASSIFICACAO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ClassificacaoEditActions.CREATE_CLASSIFICACAO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'classificacaoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ClassificacaoEditActions.GET_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ClassificacaoEditActions.SAVE_CLASSIFICACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ClassificacaoEditActions.SAVE_CLASSIFICACAO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'classificacaoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case ClassificacaoEditActions.SAVE_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ClassificacaoEditActions.UPDATE_CLASSIFICACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ClassificacaoEditActions.UPDATE_CLASSIFICACAO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'classificacaoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case ClassificacaoEditActions.UPDATE_CLASSIFICACAO_FAILED: {
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
