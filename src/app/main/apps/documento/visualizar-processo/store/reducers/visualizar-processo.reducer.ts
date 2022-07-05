import * as VisualizarProcessoActions from '../actions/visualizar-processo.actions';

export interface VisualizarProcessoState {
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
    loadedJuntadas: any;
    currentStep: {
        step: number;
        subStep: number;
    };
    currentStepLoaded: any;
    binary: {
        src: any;
        loading: boolean;
        processo?: any;
        error?: any;
    };
}

export const visualizarProcessoInitialState: VisualizarProcessoState = {
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
    loadedJuntadas: false,
    currentStep: {
        step: 0,
        subStep: 0
    },
    currentStepLoaded: false,
    binary: {
        src: null,
        loading: false,
        processo: null
    }
};

export const visualizarProcessoReducer = (state = visualizarProcessoInitialState, action: VisualizarProcessoActions.VisualizarProcessoActionsAll): VisualizarProcessoState => {
    switch (action.type) {

        case VisualizarProcessoActions.GET_PROCESSO: {
            return {
                ...state,
                processoId: null,
                loaded: false
            };
        }

        case VisualizarProcessoActions.GET_PROCESSO_SUCCESS: {
            return {
                ...state,
                processoId: action.payload.processoId,
                loaded: action.payload.loaded
            };
        }

        case VisualizarProcessoActions.GET_PROCESSO_FAILED: {
            return {
                ...state,
                processoId: null,
                loaded: false
            };
        }

        case VisualizarProcessoActions.GET_JUNTADAS: {
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

        case VisualizarProcessoActions.GET_JUNTADAS_SUCCESS: {
            const loadedJuntadas = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loadedJuntadas: loadedJuntadas
            };
        }

        case VisualizarProcessoActions.GET_JUNTADAS_FAILED: {
            return {
                ...state,
                loading: false,
                loadedJuntadas: false
            };
        }

        case VisualizarProcessoActions.UNLOAD_JUNTADAS: {
            if (action.payload.reset) {
                return {
                    ...visualizarProcessoInitialState
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

        case VisualizarProcessoActions.START_LOADING_BINARY: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    loading: true,
                    src: null
                }
            };
        }

        case VisualizarProcessoActions.SET_CURRENT_STEP: {
            return {
                ...state,
                currentStep: {
                    step: parseInt(action.payload.step, 10),
                    subStep: parseInt(action.payload.subStep, 10),
                }
            };
        }

        case VisualizarProcessoActions.SET_CURRENT_STEP_SUCCESS: {
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

        case VisualizarProcessoActions.SET_CURRENT_STEP_FAILED: {
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

        case VisualizarProcessoActions.RELOAD_JUNTADAS: {
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

        case VisualizarProcessoActions.SET_BINARY_VIEW: {
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

        case VisualizarProcessoActions.SET_BINARY_VIEW_SUCCESS: {
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

        case VisualizarProcessoActions.SET_BINARY_VIEW_FAILED: {
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

        case VisualizarProcessoActions.UNLOAD_PROCESSO: {
            return {
                ...visualizarProcessoInitialState
            };
        }

        default:
            return state;
    }
};
