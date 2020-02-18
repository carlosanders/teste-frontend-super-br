import * as TarefaDetailActions from 'app/main/apps/tarefas/tarefa-detail/store/actions/tarefa-detail.actions';

export interface TarefaDetailState {
    tarefaId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    errors: any;
    documentosId: number[];
    documentosLoaded: any;
}

export const TarefaDetailInitialState: TarefaDetailState = {
    tarefaId: null,
    loading: false,
    loaded: false,
    saving: false,
    deleting: false,
    errors: false,
    documentosId: [],
    documentosLoaded: false
};

export function TarefaDetailReducer(state = TarefaDetailInitialState, action: TarefaDetailActions.TarefaDetailActionsAll): TarefaDetailState {
    switch (action.type) {

        case TarefaDetailActions.GET_TAREFA: {
            return {
                ...state,
                loading: true
            };
        }

        case TarefaDetailActions.GET_TAREFA_SUCCESS: {

            return {
                ...state,
                tarefaId: action.payload.tarefa.id,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TarefaDetailActions.GET_TAREFA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TarefaDetailActions.DELETE_TAREFA: {
            return {
                ...state,
                deleting: true
            };
        }

        case TarefaDetailActions.DELETE_TAREFA_SUCCESS: {
            return {
                ...state,
                deleting: false
            };
        }

        case TarefaDetailActions.CREATE_TAREFA: {
            return {
                tarefaId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
                deleting: false,
                documentosId: [],
                documentosLoaded: false
            };
        }

        case TarefaDetailActions.SAVE_TAREFA: {
            return {
                ...state,
                saving: true
            };
        }

        case TarefaDetailActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case TarefaDetailActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TarefaDetailActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        default:
            return state;
    }
}
