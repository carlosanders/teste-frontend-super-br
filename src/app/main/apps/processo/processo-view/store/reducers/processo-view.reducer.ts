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

export interface JuntadaComponenteDigital {
    id: number;
    numeracaoSequencial: number;
    vinculacao: number;
}

export interface PaginadorComponentesJuntada {
    juntadaId: number;
    componentesDigitais: JuntadaComponenteDigital[];
    entitiesId: number[];
    firstJuntada: boolean;
    indice: number;
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
    loadingComponentesId: number[];
    paginadoresDocumentosVinculados: {[id: number]: PaginadorVinculacoesDocumento };
    paginadoresComponentes: {[id: number]: PaginadorComponentesJuntada };
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
    loadingComponentesId: [],
    paginadoresDocumentosVinculados: {},
    paginadoresComponentes: {},
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

        case ProcessoViewActions.GET_COMPONENTES_DIGITAIS_JUNTADA: {
            const total = state.paginadoresComponentes[action.payload.juntadaId]?.pagination?.total ?? 0;
            const loading = [...state.loadingComponentesId, action.payload.juntadaId];
            const paginadores = {
                ...state.paginadoresComponentes,
                [action.payload.juntadaId]: {
                    ...state.paginadoresComponentes[action.payload.juntadaId],
                    juntadaId: action.payload.juntadaId,
                    indice: action.payload.juntadaIndice,
                    loading: true,
                    firstJuntada: null,
                    loaded: state.paginadoresComponentes[action.payload.juntadaId]?.loaded ?? false,
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
                paginadoresComponentes: paginadores,
                loadingComponentesId: loading
            };
        }

        case ProcessoViewActions.GET_COMPONENTES_DIGITAIS_JUNTADA_SUCCESS: {
            const loading = state.loadingComponentesId.filter(juntadaId => juntadaId !== action.payload.juntadaId);
            if (state.processoId === action.payload.processoId) {
                // O componente digital em questão pertence ao processo que está atualmente no estado da aplicação
                let componentesDigitais = [];
                if (state.paginadoresComponentes[action.payload.juntadaId]?.componentesDigitais) {
                    componentesDigitais = state.paginadoresComponentes[action.payload.juntadaId].componentesDigitais;
                }
                let entities = [];
                if (state.paginadoresComponentes[action.payload.juntadaId]?.entitiesId) {
                    entities = state.paginadoresComponentes[action.payload.juntadaId].entitiesId;
                }
                const paginadores = {
                    ...state.paginadoresComponentes,
                    [action.payload.juntadaId]: {
                        ...state.paginadoresComponentes[action.payload.juntadaId],
                        loading: false,
                        entitiesId: [...entities, ...action.payload.entitiesId],
                        componentesDigitais: [...componentesDigitais, ...action.payload.componentesDigitais],
                        loaded: {
                            offset: state.paginadoresComponentes[action.payload.juntadaId].pagination.offset,
                            total: action.payload.total
                        },
                        pagination: {
                            ...state.paginadoresComponentes[action.payload.juntadaId].pagination,
                            total: action.payload.total
                        }
                    }
                };
                return {
                    ...state,
                    paginadoresComponentes: paginadores,
                    loadingComponentesId: loading
                };
            } else {
                // O processo não se encontra mais no estado da aplicação, o que significa que esta é uma requisição
                // de antes de trocar o processo exibido, não deve ser lançado no estado da aplicação
                return {
                    ...state,
                    loadingComponentesId: loading
                };
            }
        }

        case ProcessoViewActions.GET_COMPONENTES_DIGITAIS_JUNTADA_FAILED: {
            const loading = state.loadingComponentesId.filter(juntadaId => juntadaId !== action.payload.id);
            if (state.processoId === action.payload.processoId) {
                // O documento em questão pertence ao processo que está atualmente no estado da aplicação
                const paginadores = {
                    ...state.paginadoresComponentes,
                    [action.payload.id]: {
                        ...state.paginadoresComponentes[action.payload.id],
                        loading: false
                    }
                };
                return {
                    ...state,
                    loadingComponentesId: loading,
                    paginadoresComponentes: paginadores
                };
            } else {
                // O processo não se encontra mais no estado da aplicação, o que significa que esta é uma requisição
                // de antes de trocar o processo exibido, não deve ser lançado no estado da aplicação
                return {
                    ...state,
                    loadingComponentesId: loading
                };
            }
        }

        case ProcessoViewActions.SET_FIRST_JUNTADA_TRUE: {
            const paginadores = {
                ...state.paginadoresComponentes,
                [action.payload]: {
                    ...state.paginadoresComponentes[action.payload],
                    firstJuntada: true
                }
            };
            return {
                ...state,
                paginadoresComponentes: paginadores
            };
        }

        case ProcessoViewActions.SET_FIRST_JUNTADA_FALSE: {
            const paginadores = {
                ...state.paginadoresComponentes,
                [action.payload]: {
                    ...state.paginadoresComponentes[action.payload],
                    firstJuntada: false
                }
            };
            return {
                ...state,
                paginadoresComponentes: paginadores
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
                let componentesDigitais = [];
                if (state.paginadoresComponentes[action.payload.juntadaId]?.componentesDigitais) {
                    componentesDigitais = state.paginadoresComponentes[action.payload.juntadaId].componentesDigitais;
                }
                const paginadoresComponentes = {
                    ...state.paginadoresComponentes,
                    [action.payload.juntadaId]: {
                        ...state.paginadoresComponentes[action.payload.juntadaId],
                        componentesDigitais: [...componentesDigitais, ...action.payload.componentesDigitais],
                    }
                };
                return {
                    ...state,
                    paginadoresDocumentosVinculados: paginadores,
                    loadingVinculacoesDocumentosId: loading,
                    paginadoresComponentes: paginadoresComponentes
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
