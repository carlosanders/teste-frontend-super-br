import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

export interface PaginadorVinculacoesDocumento {
    documentoId: number;
    indice: number;
    vinculacoes: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loaded: any;
    loading: boolean;
    error?: any;
}

export interface ProcessoViewState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    processoId: number;
    loading: boolean;
    loadingVinculacoesDocumentosId: number[];
    paginadoresDocumentosVinculados: {[id: number]: PaginadorVinculacoesDocumento };
    loaded: any;
    currentStep: {
        step: number;
        subStep: number;
    };
    currentStepLoaded: any;
    index: any;
    binary: {
        src: any;
        loading: boolean;
        processo?: any;
        error?: any;
    };
    expandir: boolean;
}

export const processoViewInitialState: ProcessoViewState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    processoId: null,
    loading: false,
    loadingVinculacoesDocumentosId: [],
    paginadoresDocumentosVinculados: {},
    loaded: false,
    currentStep: {
        step: 0,
        subStep: 0
    },
    currentStepLoaded: false,
    index: [],
    binary: {
        src: null,
        loading: false,
        processo: null
    },
    expandir: false
};

export const processoViewReducer = (state = processoViewInitialState, action: ProcessoViewActions.ProcessoViewActionsAll): ProcessoViewState => {
    switch (action.type) {

        case ProcessoViewActions.EXPANDIR_PROCESSO: {
            return {
                ...state,
                expandir: action.payload
            };
        }

        case ProcessoViewActions.GET_JUNTADAS: {
            return {
                ...state,
                processoId: action.payload.processoId,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ProcessoViewActions.GET_JUNTADAS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                index: [...state.index, ...action.payload.index],
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case ProcessoViewActions.GET_JUNTADAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ProcessoViewActions.UNLOAD_JUNTADAS: {

            if (action.payload.reset) {
                return {
                    ...processoViewInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: [],
                    index: [],
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        case ProcessoViewActions.START_LOADING_BINARY: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    loading: true,
                    src: null
                }
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP: {
            return {
                ...state,
                currentStep: {
                    step: parseInt(action.payload.step, 10),
                    subStep: parseInt(action.payload.subStep, 10),
                }
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP_SUCCESS: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: action.payload.binary,
                    loading: false,
                    error: false
                },
                currentStepLoaded: action.payload.loaded
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP_FAILED: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: null,
                    loading: false,
                    error: action.payload
                },
                currentStepLoaded: false
            };
        }

        case ProcessoViewActions.RELOAD_JUNTADAS: {
            return {
                ...state,
                entitiesId: [],
                index: [],
                pagination: {
                    ...state.pagination,
                    limit: 10,
                    offset: 0,
                    total: 0
                }
            };
        }

        case ProcessoViewActions.UPDATE_INDEX: {
            return {
                ...state,
                index: action.payload
            };
        }

        case ProcessoViewActions.UPDATE_NODE: {
            if (state.processoId === action.payload.processoId) {
                // Action e estado da aplicação possuem o mesmo processoId, atualizar o index
                const novoIndex = [...state.index];
                novoIndex[action.payload.indice] = action.payload.componentesDigitaisIds;
                return {
                    ...state,
                    index: novoIndex
                };
            } else {
                // Processo id no estado da aplicação é diferente do que chegou da action, não mexer no index
                return {
                    ...state
                };
            }
        }

        case ProcessoViewActions.RETIRA_JUNTADA: {
            return {
                ...state,
                entitiesId: state.entitiesId.filter(juntadaId => juntadaId !== action.payload),
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                }
            };
        }

        case ProcessoViewActions.SET_BINARY_VIEW: {
            return {
                ...state,
                binary: {
                    src: null,
                    loading: true,
                    processo: null,
                    error: null
                }
            };
        }

        case ProcessoViewActions.SET_BINARY_VIEW_SUCCESS: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: action.payload.binary,
                    loading: false,
                    error: false
                }
            };
        }

        case ProcessoViewActions.SET_BINARY_VIEW_FAILED: {
            return {
                ...state,
                binary: {
                    src: null,
                    loading: false,
                    processo: null,
                    error: true
                }
            };
        }

        case ProcessoViewActions.DOWNLOAD_LATEST_BINARY: {
            return {
                ...state,
                binary: {
                    src: null,
                    loading: true,
                    processo: action.payload,
                    error: null
                }
            };
        }

        case ProcessoViewActions.REMOVE_CONTEUDO_BINARIO: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: {
                        ...state.binary.src,
                        conteudo: null,
                        loading: true
                    }
                }
            };
        }

        case ProcessoViewActions.GET_DOCUMENTOS_VINCULADOS_JUNTADA: {
            const total = state.paginadoresDocumentosVinculados[action.payload.documentoId]?.pagination?.total ?? 0;
            const loading = [...state.loadingVinculacoesDocumentosId, action.payload.documentoId];
            const paginadores = {
                ...state.paginadoresDocumentosVinculados,
                [action.payload.documentoId]: {
                    ...state.paginadoresDocumentosVinculados[action.payload.documentoId],
                    documentoId: action.payload.documentoId,
                    indice: action.payload.juntadaIndice,
                    loading: true,
                    loaded: state.paginadoresDocumentosVinculados[action.payload.documentoId]?.loaded ?? false,
                    pagination: {
                        limit: action.payload.limit,
                        offset: action.payload.offset,
                        filter: action.payload.filter,
                        populate: action.payload.populate,
                        sort: action.payload.sort,
                        total: total
                    }
                }
            };
            return {
                ...state,
                paginadoresDocumentosVinculados: paginadores,
                loadingVinculacoesDocumentosId: loading
            };
        }

        case ProcessoViewActions.GET_DOCUMENTOS_VINCULADOS_JUNTADA_SUCCESS: {
            const loading = state.loadingVinculacoesDocumentosId.filter(documentoId => documentoId !== action.payload.documentoId);
            if (state.processoId === action.payload.processoId) {
                // O documento em questão pertence ao processo que está atualmente no estado da aplicação
                let vinculacoes = [];
                if (state.paginadoresDocumentosVinculados[action.payload.documentoId]?.vinculacoes) {
                    vinculacoes = state.paginadoresDocumentosVinculados[action.payload.documentoId].vinculacoes;
                }
                const paginadores = {
                    ...state.paginadoresDocumentosVinculados,
                    [action.payload.documentoId]: {
                        ...state.paginadoresDocumentosVinculados[action.payload.documentoId],
                        loading: false,
                        vinculacoes: [...vinculacoes, ...action.payload.entitiesId],
                        loaded: {
                            offset: state.paginadoresDocumentosVinculados[action.payload.documentoId].pagination.offset,
                            total: action.payload.total
                        },
                        pagination: {
                            ...state.paginadoresDocumentosVinculados[action.payload.documentoId].pagination,
                            total: action.payload.total
                        }
                    }
                };
                return {
                    ...state,
                    paginadoresDocumentosVinculados: paginadores,
                    loadingVinculacoesDocumentosId: loading
                };
            } else {
                // O processo não se encontra mais no estado da aplicação, o que significa que esta é uma requisição
                // de antes de trocar o processo exibido, não deve ser lançado no estado da aplicação
                return {
                    ...state,
                    loadingVinculacoesDocumentosId: loading
                };
            }
        }

        case ProcessoViewActions.GET_DOCUMENTOS_VINCULADOS_JUNTADA_FAILED: {
            const loading = state.loadingVinculacoesDocumentosId.filter(documentoId => documentoId !== action.payload.id);
            if (state.processoId === action.payload.processoId) {
                // O documento em questão pertence ao processo que está atualmente no estado da aplicação
                const paginadores = {
                    ...state.paginadoresDocumentosVinculados,
                    [action.payload.id]: {
                        ...state.paginadoresDocumentosVinculados[action.payload.id],
                        loading: false,
                        error: action.payload.error
                    }
                };
                return {
                    ...state,
                    loadingVinculacoesDocumentosId: loading,
                    paginadoresDocumentosVinculados: paginadores
                };
            } else {
                // O processo não se encontra mais no estado da aplicação, o que significa que esta é uma requisição
                // de antes de trocar o processo exibido, não deve ser lançado no estado da aplicação
                return {
                    ...state,
                    loadingVinculacoesDocumentosId: loading
                };
            }
        }

        case ProcessoViewActions.GET_CAPA_PROCESSO: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    processo: null,
                    src: null,
                    loading: false
                }
            };
        }
        default:
            return state;
    }
};
