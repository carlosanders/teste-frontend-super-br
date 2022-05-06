import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

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
    loaded: any;
    currentStep: {
        step: number;
        subStep: any;
    };
    currentStepLoaded: any;
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
    loaded: false,
    currentStep: {
        step: 0,
        subStep: 0
    },
    currentStepLoaded: false,
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
                pagination: {
                    ...state.pagination,
                    limit: 10,
                    offset: 0,
                    total: 0
                }
            };
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
