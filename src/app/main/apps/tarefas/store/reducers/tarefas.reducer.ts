import * as TarefasActions from 'app/main/apps/tarefas/store/actions/tarefas.actions';
import {Etiqueta} from '@cdk/models';

export interface TarefasState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        folderFilter: any;
        gridFilter: any;
        listFilter: any;
        etiquetaFilter: Etiqueta[];
        populate: any;
        sort: any;
        total: number;
        context: any;
    };

    loading: boolean;
    loaded: any;
    togglingUrgenteIds: number[];
    deletingTarefaIds: number[];
    undeletingTarefaIds: number[];
    bufferingDelete: number;
    bufferingCiencia: number;
    bufferingRedistribuir: number;
    bufferingDistribuir: number;
    changingFolderTarefaIds: number[];
    trocandoPastas: boolean;
    togglingLidaTarefaIds: number[];
    currentTarefaId: any;
    deletedTarefaIds: number[];
    selectedTarefaIds: number[];
    draggingIds: number[];
    maximizado: boolean;
    loadingAssuntosProcessosId: number[];
    loadingInteressadosProcessosId: number[];
    totalInteressadosProcessosId: any[];
    cienciaTarefaIds: number[];
    redistribuindoTarefaIds: number[];
    distribuindoTarefaIds: number[];
    savingVinculacaoEtiquetaId: number;
    error: any;
    errorDelete: number[];
    errorCiencia: number[];
    errorRedistribuir: number[];
    clearForm: boolean;
    errorDistribuir: number[];
    savingObservacaoIds: number[];
    observacaoEditIds: number[];
    viewMode: string;
    loadingAcoes: boolean;
    acoesId: number[];
    collapsedGroups: string[];
}

export const tarefasInitialState: TarefasState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        folderFilter: {},
        gridFilter: {},
        listFilter: {},
        etiquetaFilter: [],
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    loading: false,
    loaded: false,
    togglingUrgenteIds: [],
    deletingTarefaIds: [],
    undeletingTarefaIds: [],
    changingFolderTarefaIds: [],
    trocandoPastas: false,
    togglingLidaTarefaIds: [],
    bufferingDelete: 0,
    bufferingCiencia: 0,
    bufferingRedistribuir: 0,
    bufferingDistribuir: 0,
    deletedTarefaIds: [],
    savingVinculacaoEtiquetaId: null,
    selectedTarefaIds: [],
    draggingIds: [],
    currentTarefaId: null,
    maximizado: false,
    loadingAssuntosProcessosId: [],
    loadingInteressadosProcessosId: [],
    totalInteressadosProcessosId: [],
    cienciaTarefaIds: [],
    redistribuindoTarefaIds: [],
    distribuindoTarefaIds: [],
    error: null,
    errorDelete: [],
    errorCiencia: [],
    errorRedistribuir: [],
    errorDistribuir: [],
    clearForm: false,
    savingObservacaoIds: [],
    observacaoEditIds: [],
    viewMode: 'list',
    loadingAcoes: false,
    acoesId: [],
    collapsedGroups: []
};

export const tarefasReducer = (state = tarefasInitialState, action: TarefasActions.TarefasActionsAll): TarefasState => {
    switch (action.type) {

        case TarefasActions.UNLOAD_TAREFAS: {
            if (action.payload.reset) {
                return {
                    ...tarefasInitialState,
                    viewMode: state.viewMode
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    entitiesId: [],
                    selectedTarefaIds: [],
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        case TarefasActions.GET_TAREFAS: {
            return {
                ...state,
                loading: true,
                viewMode: action.payload.viewMode || state.viewMode,
                selectedTarefaIds: (action.payload.viewMode && action.payload.viewMode == state.viewMode ? state.selectedTarefaIds : []),
                entitiesId: (action.payload.viewMode && action.payload.viewMode == state.viewMode ? state.entitiesId : []),
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    folderFilter: action.payload.folderFilter,
                    gridFilter: action.payload.gridFilter,
                    listFilter: action.payload.listFilter,
                    etiquetaFilter: action.payload.etiquetaFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total,
                    context: action.payload.context
                },
                error: null
            };
        }

        case TarefasActions.CREATE_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case TarefasActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                savingVinculacaoEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case TarefasActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                savingVinculacaoEtiquetaId: null
            };
        }

        case TarefasActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                savingVinculacaoEtiquetaId: null
            };
        }

        case TarefasActions.GET_TAREFAS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded,
                errorDelete: []
            };
        }

        case TarefasActions.GET_TAREFAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload,
                errorDelete: []
            };
        }

        case TarefasActions.CHANGE_SELECTED_TAREFAS: {
            return {
                ...state,
                selectedTarefaIds: action.payload,

            };
        }

        case TarefasActions.CHANGE_DRAGGED_TAREFAS: {
            return {
                ...state,
                draggingIds: action.payload,
            };
        }

        case TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS_START: {
            return {
                ...state,
                trocandoPastas: true,
                changingFolderTarefaIds: [...state.changingFolderTarefaIds, ...action.payload]
            };
        }

        case TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.id);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.id);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedTarefaIds: selectedTarefaIds,
                changingFolderTarefaIds: state.changingFolderTarefaIds.filter(id => id !== action.payload.id),
            };
        }

        case TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS_FAILED: {
            return {
                ...state,
                changingFolderTarefaIds: state.changingFolderTarefaIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS_FINISH: {
            return {
                ...state,
                trocandoPastas: false
            };
        }

        case TarefasActions.DISTRIBUIR_TAREFA: {
            let entitiesId = state.entitiesId;
            const navegacao = state.loaded.value.split('_');
            let total = state.pagination.total;
            // Checar se estamos visualizando tarefas do tipo coordenação
            // E se o setor em questão é diferente do setorResponsável para onde foi distribuída a tarefa
            if (navegacao[1] === 'coordenacao' && navegacao[2] != action.payload.setorResponsavel) {
                // Caso afirmativo, remover a tarefa da lista
                entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
                total = total > 0 ? total - 1 : 0;
            } else if (navegacao[1] === 'minhas-tarefas' && action.payload.usuarioResponsavel) {
                entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
                total = total > 0 ? total - 1 : 0;
            }

            return {
                ...state,
                entitiesId: entitiesId,
                selectedTarefaIds: state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id),
                pagination: {
                    ...state.pagination,
                    total: total
                },
                distribuindoTarefaIds: [...state.distribuindoTarefaIds, action.payload.tarefa.id]
            };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_SUCCESS: {
            return {
                ...state,
                distribuindoTarefaIds: state.distribuindoTarefaIds.filter(id => id !== action.payload),
                errorDistribuir: [],
                error: null
            };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_FAILED: {
            const navegacao = state.loaded.value.split('_');
            let entitiesId = state.entitiesId;
            let total = state.pagination.total;
            // Checar se estamos visualizando tarefas do tipo coordenação
            // E se o setor em questão é diferente do setorResponsável para onde foi distribuída a tarefa
            if (navegacao[1] === 'coordenacao' && navegacao[2] != action.payload.setorResponsavel) {
                // Caso afirmativo, devolver a tarefa à lista
                entitiesId = [...entitiesId, action.payload.id];
                total++;
            } else if (navegacao[1] === 'minhas-tarefas' && action.payload.usuarioResponsavel) {
                // Devolver a tarefa à lista
                entitiesId = [...entitiesId, action.payload.id];
                total++;
            }
            return {
                ...state,
                errorDistribuir: [...state.errorDistribuir, action.payload.id],
                distribuindoTarefaIds: state.distribuindoTarefaIds.filter(id => id !== action.payload.id),
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: total
                },
                error: action.payload.error
            };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_CANCEL: {
            return {
                ...state,
                distribuindoTarefaIds: [],
                bufferingDistribuir: state.bufferingDistribuir + 1,
                errorDistribuir: [],
                error: null
            };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_FLUSH: {
            return {
                ...state,
                bufferingDistribuir: state.bufferingDistribuir + 1
            };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_CANCEL_SUCCESS: {
            const navegacao = state.loaded.value.split('_');
            let entitiesId = state.entitiesId;
            let total = state.pagination.total;
            // Checar se estamos visualizando tarefas do tipo coordenação
            // E se o setor em questão é diferente do setorResponsável para onde foi distribuída a tarefa
            if (navegacao[1] === 'coordenacao' && navegacao[2] != action.payload.setorResponsavel) {
                // Caso afirmativo, devolver a tarefa à lista
                entitiesId = [...entitiesId, action.payload.tarefa.id];
                total++;
            } else if (navegacao[1] === 'minhas-tarefas' && action.payload.usuarioResponsavel) {
                // Devolver a tarefa à lista
                entitiesId = [...entitiesId, action.payload.tarefa.id];
                total++;
            }

            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: total
                },
            };
        }

        case TarefasActions.DELETE_TAREFA: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefaId);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.tarefaId);
            return {
                ...state,
                entitiesId: entitiesId,
                selectedTarefaIds: selectedTarefaIds,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                deletingTarefaIds: [...state.deletingTarefaIds, action.payload.tarefaId],
                error: null
            };
        }

        case TarefasActions.DELETE_TAREFA_SUCCESS: {
            return {
                ...state,
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload),
                errorDelete: [],
                error: null
            };
        }

        case TarefasActions.DELETE_TAREFA_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload.id),
                entitiesId: [...state.entitiesId.filter((id) => id !== action.payload.id), action.payload.id],
                error: action.payload.error
            };
        }

        case TarefasActions.UNDELETE_TAREFA: {
            return {
                ...state,
                undeletingTarefaIds: [...state.undeletingTarefaIds, action.payload.tarefa.id],
            };
        }

        case TarefasActions.UNDELETE_TAREFA_SUCCESS: {
            return {
                ...state,
                undeletingTarefaIds: state.undeletingTarefaIds.filter(id => id !== action.payload.tarefa.id),
                entitiesId: !action.payload.loaded || action.payload.loaded === state.loaded ?
                    [...state.entitiesId, action.payload.tarefa.id] : state.entitiesId
            };
        }

        case TarefasActions.UNDELETE_TAREFA_FAILED: {
            return {
                ...state,
                undeletingTarefaIds: state.undeletingTarefaIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case TarefasActions.DELETE_TAREFA_CANCEL: {
            return {
                ...state,
                deletingTarefaIds: [],
                bufferingDelete: state.bufferingDelete + 1,
                errorDelete: [],
                error: null
            };
        }

        case TarefasActions.DELETE_TAREFA_FLUSH: {
            return {
                ...state,
                bufferingDelete: state.bufferingDelete + 1
            };
        }

        case TarefasActions.DELETE_TAREFA_CANCEL_SUCCESS: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, action.payload],
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total + 1
                },
            };
        }

        case TarefasActions.REMOVE_TAREFA: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedTarefaIds: selectedTarefaIds
            };
        }

        case TarefasActions.TOGGLE_LIDA_TAREFA: {
            return {
                ...state,
                togglingLidaTarefaIds: [...state.togglingLidaTarefaIds, action.payload]
            };
        }

        case TarefasActions.TOGGLE_LIDA_TAREFA_SUCCESS: {
            return {
                ...state,
                togglingLidaTarefaIds: state.togglingLidaTarefaIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.TOGGLE_LIDA_TAREFA_FAILED: {
            return {
                ...state,
                togglingLidaTarefaIds: state.togglingLidaTarefaIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.SET_CURRENT_TAREFA: {
            return {
                ...state,
                currentTarefaId: action.payload,
                selectedTarefaIds: action.payload.tarefaId ? [action.payload.tarefaId] : []
            };
        }

        case TarefasActions.SYNC_CURRENT_TAREFA_ID: {
            return {
                ...state,
                currentTarefaId: action.payload,
                selectedTarefaIds: action.payload.tarefaId ? [action.payload.tarefaId] : state.selectedTarefaIds
            };
        }

        case TarefasActions.TOGGLE_MAXIMIZADO: {
            return {
                ...state,
                maximizado: action.payload
            };
        }

        case TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA: {
            return {
                ...state,
                // eslint-disable-next-line max-len
                loadingAssuntosProcessosId: (state.loadingAssuntosProcessosId.indexOf(action.payload.processoId) === -1 ? [...state.loadingAssuntosProcessosId, action.payload.processoId] : [...state.loadingAssuntosProcessosId])
            };
        }

        case TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA_SUCCESS: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA_FAILED: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.GET_INTERESSADOS_PROCESSO_TAREFA: {
            let total = state.totalInteressadosProcessosId;
            if (state.loadingInteressadosProcessosId.indexOf(action.payload.processoId) === -1) {
                total = total.filter(total => total.id !== action.payload.processoId);
                total.push({
                    id: action.payload.processoId,
                    total: 0
                });
            }
            return {
                ...state,
                // tslint:disable-next-line:max-line-length
                loadingInteressadosProcessosId: (state.loadingInteressadosProcessosId.indexOf(action.payload.processoId) === -1 ? [...state.loadingInteressadosProcessosId, action.payload.processoId] : [...state.loadingInteressadosProcessosId]),
                totalInteressadosProcessosId: total
            };
        }

        case TarefasActions.GET_INTERESSADOS_PROCESSO_TAREFA_SUCCESS: {
            const total = state.totalInteressadosProcessosId.filter(total => total.id !== action.payload.processoId);
            total.push({
                id: action.payload.processoId,
                total: action.payload.total
            });
            return {
                ...state,
                loadingInteressadosProcessosId: state.loadingInteressadosProcessosId.filter(id => id !== action.payload.processoId),
                totalInteressadosProcessosId: total
            };
        }

        case TarefasActions.GET_INTERESSADOS_PROCESSO_TAREFA_FAILED: {
            return {
                ...state,
                loadingInteressadosProcessosId: state.loadingInteressadosProcessosId.filter(id => id !== action.payload),
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id);
            return {
                ...state,
                entitiesId: entitiesId,
                selectedTarefaIds: selectedTarefaIds,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                cienciaTarefaIds: [...state.cienciaTarefaIds, action.payload.tarefa.id]
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_SUCCESS: {
            return {
                ...state,
                cienciaTarefaIds: state.cienciaTarefaIds.filter(id => id !== action.payload),
                errorCiencia: [],
                error: null
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_FAILED: {
            return {
                ...state,
                errorCiencia: [...state.errorCiencia, action.payload.id],
                cienciaTarefaIds: state.cienciaTarefaIds.filter(id => id !== action.payload.id),
                entitiesId: [...state.entitiesId, action.payload.id],
                error: action.payload.error
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_CANCEL: {
            return {
                ...state,
                cienciaTarefaIds: [],
                bufferingCiencia: state.bufferingCiencia + 1,
                errorCiencia: [],
                error: null
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_FLUSH: {
            return {
                ...state,
                bufferingCiencia: state.bufferingCiencia + 1,
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_CANCEL_SUCCESS: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, action.payload],
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total + 1
                },
            };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id);
            return {
                ...state,
                entitiesId: entitiesId,
                selectedTarefaIds: selectedTarefaIds,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                redistribuindoTarefaIds: [...state.redistribuindoTarefaIds, action.payload.tarefa.id]
            };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_FAILED: {
            return {
                ...state,
                redistribuindoTarefaIds: state.redistribuindoTarefaIds.filter(id => id !== action.payload),
                entitiesId: [...state.entitiesId, action.payload.id],
                errorRedistribuir: [...state.errorRedistribuir, action.payload.id],
                error: action.payload.error
            };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_SUCCESS: {
            return {
                ...state,
                redistribuindoTarefaIds: state.redistribuindoTarefaIds.filter(id => id !== action.payload),
                errorRedistribuir: [],
                error: null
            };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_CANCEL: {
            return {
                ...state,
                redistribuindoTarefaIds: [],
                errorRedistribuir: [],
                error: null
            };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_CANCEL_SUCCESS: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, action.payload],
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total + 1
                },
            };
        }

        case TarefasActions.TOGGLE_URGENTE_TAREFA: {
            return {
                ...state,
                togglingUrgenteIds: [...state.togglingUrgenteIds, action.payload.id],
            };
        }

        case TarefasActions.TOGGLE_URGENTE_TAREFA_SUCCESS: {
            return {
                ...state,
                togglingUrgenteIds: state.togglingUrgenteIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.TOGGLE_URGENTE_TAREFA_FAILED: {
            return {
                ...state,
                togglingUrgenteIds: state.togglingUrgenteIds.filter(id => id !== action.payload.id)
            };
        }

        case TarefasActions.CREATE_TAREFA: {
            return {
                ...state,
                clearForm: true
            };
        }

        case TarefasActions.CREATE_TAREFA_SUCCESS: {
            return {
                ...state,
                clearForm: false
            };
        }

        case TarefasActions.SAVE_OBSERVACAO: {
            return {
                ...state,
                savingObservacaoIds: [
                    ...state.savingObservacaoIds.filter((id) => id !== action.payload.tarefa.id),
                    action.payload.tarefa.id
                ],
                error: null
            };
        }

        case TarefasActions.SAVE_OBSERVACAO_SUCCESS: {
            return {
                ...state,
                savingObservacaoIds: [
                    ...state.savingObservacaoIds.filter((id) => id !== action.payload)
                ],
                error: null,
                observacaoEditIds: [
                    ...state.observacaoEditIds.filter((id) => id !== action?.payload)
                ]
            };
        }

        case TarefasActions.SAVE_OBSERVACAO_FAILED: {
            return {
                ...state,
                savingObservacaoIds: [
                    ...state.savingObservacaoIds.filter((id) => id !== action.payload.tarefaId)
                ],
                error: {statusText: action.payload.error.error.message},
            };
        }

        case TarefasActions.EDITAR_OBSERVACAO: {
            return {
                ...state,
                observacaoEditIds: [
                    ...state.observacaoEditIds.filter((id) => id !== action.payload),
                    action.payload
                ]
            };
        }

        case TarefasActions.CHANGE_VIEW_MODE: {
            return {
                ...state,
                viewMode: action.payload
            };
        }

        case TarefasActions.GET_ACOES_ETIQUETA: {
            return {
                ...state,
                acoesId: [],
                loadingAcoes: true
            };
        }

        case TarefasActions.GET_ACOES_ETIQUETA_SUCCESS: {
            return {
                ...state,
                acoesId: action.payload,
                loadingAcoes: false
            };
        }

        case TarefasActions.GET_ACOES_ETIQUETA_FAILED: {
            return {
                ...state,
                acoesId: [],
                loadingAcoes: false,
                error: action.payload
            };
        }

        case TarefasActions.APROVAR_SUGESTAO: {
            return {
                ...state,
                savingVinculacaoEtiquetaId: action.payload
            };
        }

        case TarefasActions.APROVAR_SUGESTAO_SUCCESS: {
            return {
                ...state,
                savingVinculacaoEtiquetaId: null
            };
        }

        case TarefasActions.APROVAR_SUGESTAO_FAILED: {
            return {
                ...state,
                savingVinculacaoEtiquetaId: null,
                error: action.payload
            };
        }

        case TarefasActions.TOGGLE_GROUP: {
            const collapsedGroups = [
                ...state.collapsedGroups.filter((group) => group !== action.payload.identifier)
            ];
            if (!action.payload.expanded) {
                collapsedGroups.push(action.payload.identifier);
            }

            return {
                ...state,
                collapsedGroups: collapsedGroups,
            };
        }

        case TarefasActions.UNLOAD_GROUP: {
            return {
                ...state,
                collapsedGroups: [],
            };
        }

        case TarefasActions.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            };
        }

        default:
            return state;
    }
};
