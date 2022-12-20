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
    bufferingCiencia: number;
    bufferingRedistribuir: number;
    cienciaId: number;
    redistribuindoId: number;
    tarefaProcessoRestritoValidada: number;
    error: any;
    showDetail: boolean;
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
    savingVinculacaoEtiquetaId: null,
    bufferingCiencia: 0,
    bufferingRedistribuir: 0,
    cienciaId: null,
    redistribuindoId: null,
    tarefaProcessoRestritoValidada: null,
    error: null,
    showDetail: true
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

        case TarefaDetailActions.REDISTRIBUIR_TAREFA: {
            return {
                ...state,
                saving: true,
                redistribuindoId: action.payload.tarefa.id
            };
        }

        case TarefaDetailActions.REDISTRIBUIR_TAREFA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                error: null,
                redistribuindoId: null
            };
        }

        case TarefaDetailActions.REDISTRIBUIR_TAREFA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                error: action.payload.error,
                redistribuindoId: null
            };
        }

        case TarefaDetailActions.REDISTRIBUIR_TAREFA_CANCEL: {
            return {
                ...state,
                saving: false,
                redistribuindoId: null,
                error: null,
                bufferingRedistribuir: state.bufferingRedistribuir + 1
            };
        }

        case TarefaDetailActions.REDISTRIBUIR_TAREFA_CANCEL_SUCCESS: {
            return {
                ...state,
                error: null
            };
        }

        case TarefaDetailActions.REDISTRIBUIR_TAREFA_FLUSH: {
            return {
                ...state,
                bufferingRedistribuir: state.bufferingRedistribuir + 1
            };
        }

        case TarefaDetailActions.DAR_CIENCIA_TAREFA: {
            return {
                ...state,
                cienciaId: action.payload.tarefa.id
            };
        }

        case TarefaDetailActions.DAR_CIENCIA_TAREFA_SUCCESS: {
            return {
                ...state,
                cienciaId: null,
                error: null
            };
        }

        case TarefaDetailActions.DAR_CIENCIA_TAREFA_FAILED: {
            return {
                ...state,
                cienciaId: null,
                error: action.payload.error
            };
        }

        case TarefaDetailActions.DAR_CIENCIA_TAREFA_CANCEL: {
            return {
                ...state,
                cienciaId: null,
                bufferingCiencia: state.bufferingCiencia + 1,
                error: null
            };
        }

        case TarefaDetailActions.DAR_CIENCIA_TAREFA_FLUSH: {
            return {
                ...state,
                bufferingCiencia: state.bufferingCiencia + 1,
            };
        }

        case TarefaDetailActions.DAR_CIENCIA_TAREFA_CANCEL_SUCCESS: {
            return {
                ...state,
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
                pluginLoading: state.pluginLoading.filter(value => value !== action.payload)
            };
        }

        case TarefaDetailActions.TAREFA_PROCESO_RESTRITO_VALIDADA_SUCCESS: {
            return {
                ...state,
                tarefaProcessoRestritoValidada: action.payload
            };
        }

        case TarefaDetailActions.TOGGLE_SHOW_DETAIL: {
            return {
                ...state,
                showDetail: action.payload
            };
        }

        case TarefaDetailActions.APROVAR_SUGESTAO: {
            return {
                ...state,
                saving: true
            };
        }

        case TarefaDetailActions.APROVAR_SUGESTAO_SUCCESS: {
            return {
                ...state,
                saving: false
            };
        }

        case TarefaDetailActions.APROVAR_SUGESTAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TarefaDetailActions.CLEAR_ERROR: {
            return {
                ...state,
                errors: null
            };
        }

        case TarefaDetailActions.UNLOAD_TAREFA_DETAIL: {
            return {
                ...TarefaDetailInitialState
            };
        }

        default:
            return state;
    }
}
