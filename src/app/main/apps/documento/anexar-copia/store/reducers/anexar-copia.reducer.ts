import * as AnexarCopiaActions from '../actions/anexar-copia.actions';

export interface AnexarCopiaState {
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
        subStep: any;
        documentoId: number;
    };
    currentStepLoaded: any;
    binary: {
        src: any;
        loading: boolean;
        processo?: any;
        error?: any;
    };
    loadingLatestBinary: boolean;
}

export const anexarCopiaInitialState: AnexarCopiaState = {
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
        subStep: 0,
        documentoId: 0
    },
    currentStepLoaded: false,
    binary: {
        src: null,
        loading: false,
        processo: null
    },
    loadingLatestBinary: false
};

export const anexarCopiaReducer = (state = anexarCopiaInitialState, action: AnexarCopiaActions.AnexarCopiaActionsAll): AnexarCopiaState => {
    switch (action.type) {

        case AnexarCopiaActions.GET_PROCESSO: {
            return {
                ...state,
                processoId: null,
                loaded: false
            };
        }

        case AnexarCopiaActions.GET_PROCESSO_SUCCESS: {
            return {
                ...state,
                processoId: action.payload.processoId,
                loaded: action.payload.loaded
            };
        }

        case AnexarCopiaActions.GET_PROCESSO_FAILED: {
            return {
                ...state,
                processoId: null,
                loaded: false
            };
        }

        case AnexarCopiaActions.GET_JUNTADAS: {
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

        case AnexarCopiaActions.GET_JUNTADAS_SUCCESS: {
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

        case AnexarCopiaActions.GET_JUNTADAS_FAILED: {
            return {
                ...state,
                loading: false,
                loadedJuntadas: false
            };
        }

        case AnexarCopiaActions.UNLOAD_JUNTADAS: {
            if (action.payload.reset) {
                return {
                    ...anexarCopiaInitialState
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

        case AnexarCopiaActions.START_LOADING_BINARY: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    loading: true,
                    src: null
                }
            };
        }

        case AnexarCopiaActions.SET_CURRENT_STEP: {
            return {
                ...state,
                currentStep: {
                    step: parseInt(action.payload.step, 10),
                    subStep: parseInt(action.payload.subStep, 10),
                    documentoId: parseInt(action.payload.documentoId, 10)
                }
            };
        }

        case AnexarCopiaActions.SET_CURRENT_STEP_SUCCESS: {
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

        case AnexarCopiaActions.SET_CURRENT_STEP_FAILED: {
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

        case AnexarCopiaActions.RELOAD_JUNTADAS: {
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

        case AnexarCopiaActions.DOWNLOAD_LATEST_BINARY: {
            return {
                ...state,
                binary: {
                    src: null,
                    loading: true,
                    processo: action.payload,
                    error: null
                },
                loadingLatestBinary: true
            };
        }

        case AnexarCopiaActions.DOWNLOAD_LATEST_BINARY_SUCCESS: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: action.payload.binary,
                    loading: false,
                    error: false
                },
                currentStep: {
                    step: 0,
                    subStep: action.payload.subStep,
                    documentoId: 0
                },
                loadingLatestBinary: false
            };
        }

        case AnexarCopiaActions.DOWNLOAD_LATEST_BINARY_FAILED: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: null,
                    loading: false,
                    error: action.payload.error
                },
                currentStepLoaded: false,
                loadingLatestBinary: false
            };
        }

        case AnexarCopiaActions.SET_BINARY_VIEW: {
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

        case AnexarCopiaActions.SET_BINARY_VIEW_SUCCESS: {
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

        case AnexarCopiaActions.SET_BINARY_VIEW_FAILED: {
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

        case AnexarCopiaActions.UNLOAD_COPIA: {
            return {
                ...anexarCopiaInitialState
            };
        }

        default:
            return state;
    }
};
