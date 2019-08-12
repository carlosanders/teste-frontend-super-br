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
    loading: boolean;
    loaded: any;
    currentStep: {
        step: number;
        subStep: number;
    }
    index: any;
    binary: {
        src: any;
        loading: boolean;
    };
}

export const ProcessoViewInitialState: ProcessoViewState = {
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
    loading: false,
    loaded: false,
    currentStep: {
        step: 0,
        subStep: 0
    },
    index: {},
    binary: {
        src: null,
        loading: false
    }
};

export function ProcessoViewReducer(state = ProcessoViewInitialState, action: ProcessoViewActions.ProcessoViewActionsAll): ProcessoViewState {
    switch (action.type) {

        case ProcessoViewActions.GET_JUNTADAS: {
            return {
                ...state,
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
                index: action.payload.index,
                entitiesId: action.payload.entitiesId,
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
            return {
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
                loading: false,
                loaded: false,
                currentStep: {
                    step: 0,
                    subStep: 0
                },
                index: {},
                binary: {
                    src: null,
                    loading: false
                }
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP: {
            return {
                ...state,
                currentStep: {
                   step: action.payload.step,
                   subStep: action.payload.subStep,
                },
                binary: {
                    src: null,
                    loading: true
                }
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP_SUCCESS: {
            return {
                ...state,
                binary: {
                    src: action.payload,
                    loading: false
                }
            };
        }

        case ProcessoViewActions.SET_CURRENT_STEP_FAILED: {
            return {
                ...state,
                binary: {
                    src: null,
                    loading: false
                }
            };
        }

        default:
            return state;
    }
}
