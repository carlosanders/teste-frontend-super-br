import * as TarefaDetailActions from 'app/main/apps/tarefas/tarefa-detail/store/actions/tarefa-detail.actions';

export interface TarefaDetailState {
    tarefaId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    pluginLoading: string[];
    errors: any;
    documentosId: number[];
    documentosLoaded: any;
    savingVinculacaoEtiquetaId: number;
}

export const TarefaDetailInitialState: TarefaDetailState = {
    tarefaId: null,
    loading: false,
    loaded: false,
    saving: false,
    deleting: false,
    errors: false,
    documentosId: [],
    pluginLoading: [],
    documentosLoaded: false,
    savingVinculacaoEtiquetaId: null
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
                ...TarefaDetailInitialState
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


        case TarefaDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                saving: true,
                savingVinculacaoEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case TarefaDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                savingVinculacaoEtiquetaId: null
            };
        }

        case TarefaDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                savingVinculacaoEtiquetaId: null
            };
        }

        case TarefaDetailActions.ADD_PLUGIN_LOADING: {
            return {
                ...state,
                pluginLoading: [...state.pluginLoading, action.payload]
            };
        }

        case TarefaDetailActions.REMOVE_PLUGIN_LOADING: {
            return {
                ...state,
                pluginLoading: state.pluginLoading.filter((value) => value !== action.payload)
            };
        }

        default:
            return state;
    }
}
