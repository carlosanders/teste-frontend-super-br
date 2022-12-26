import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

export type ProcessoViewActiveCard = 'juntadas' | 'bookmark' | 'juntadas-select' | 'juntadas-desvincular' | 'juntadas-assinar';

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
    activeCard: ProcessoViewActiveCard;
    pagina: number;
    selectedJuntadasId: number[];
    selectedJuntadasVinculadasId: number[];
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
    expandir: false,
    activeCard: 'juntadas',
    pagina: null,
    selectedJuntadasId: [],
    selectedJuntadasVinculadasId: [],
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

        case ProcessoViewActions.GET_JUNTADA_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                loading: true
            };
        }

        case ProcessoViewActions.GET_JUNTADA_DOCUMENTO_VINCULADO_SUCCESS: {
            let total = state.pagination.total + 1;

            return {
                ...state,
                entitiesId: [...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: total
                },
                loading: false
            };
        }

        case ProcessoViewActions.GET_JUNTADA_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                loading: false
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
                    },
                    pagina: null,
                    selectedJuntadasId: []
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
                },
                pagina: null
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP: {
            const step = action.payload.step ? parseInt(action.payload.step, 10) : state.currentStep.step;
            return {
                ...state,
                currentStep: {
                    step: step,
                    subStep: action.payload.subStep,
                },
                pagina: null
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP_SUCCESS: {
            const step = action.payload.step ?? state.currentStep.step;
            const subStep = action.payload.subStep ?? state.currentStep.subStep;
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: action.payload.binary,
                    loading: false,
                    error: false
                },
                currentStep: {
                    step: step,
                    subStep: subStep
                },
                currentStepLoaded: action.payload.loaded,
                activeCard: state.activeCard === 'bookmark' ? 'juntadas' : state.activeCard,
                selectedJuntadasId: [
                    ...(state.activeCard === 'bookmark' ? [] : state.selectedJuntadasId)
                ]
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
                },
                activeCard: 'bookmark',
                pagina: action.payload.pagina,
                selectedJuntadasId: []
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

        case ProcessoViewActions.DOWNLOAD_LATEST_BINARY_SUCCESS: {
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
                    subStep: action.payload.subStep
                }
            };
        }

        case ProcessoViewActions.DOWNLOAD_LATEST_BINARY_FAILED: {
            return {
                ...state,
                binary: {
                    ...state.binary,
                    src: null,
                    loading: false,
                    error: action.payload.error
                },
                currentStepLoaded: false,
                activeCard: 'juntadas',
                pagina: null,
                selectedJuntadasId: []
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
                },
                activeCard: state.activeCard === 'bookmark' ? 'juntadas' : state.activeCard,
                pagina: null,
                selectedJuntadasId: [
                    ...(state.activeCard === 'bookmark' ? [] : state.selectedJuntadasId)
                ]
            };
        }

        case ProcessoViewActions.SET_ACTIVE_CARD: {
            return {
                ...state,
                activeCard: action.payload,
                selectedJuntadasId: []
            };
        }

        case ProcessoViewActions.TOGGLE_SELECT_JUNTADA_ID: {
            return {
                ...state,
                selectedJuntadasId: state.selectedJuntadasId.includes(action.payload) ?
                    [...state.selectedJuntadasId.filter((id) => id !== action.payload)] : [...state.selectedJuntadasId, action.payload]
            };
        }

        case ProcessoViewActions.TOGGLE_SELECT_JUNTADA_VINCULADA_ID: {
            return {
                ...state,
                selectedJuntadasVinculadasId: state.selectedJuntadasVinculadasId.includes(action.payload) ?
                    [...state.selectedJuntadasVinculadasId.filter((id) => id !== action.payload)] : [...state.selectedJuntadasVinculadasId, action.payload]
            };
        }

        case ProcessoViewActions.UNLOAD_SELECTED_JUNTADAS_ID: {
            return {
                ...state,
                selectedJuntadasId: [],
                selectedJuntadasVinculadasId: []
            };
        }
        default:
            return state;
    }
};
