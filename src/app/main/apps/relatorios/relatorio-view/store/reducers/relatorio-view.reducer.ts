import * as RelatorioViewActions from 'app/main/apps/relatorios/relatorio-view/store/actions/relatorio-view.actions';

export interface RelatorioViewState {
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
    };
    index: any;
    binary: {
        src: any;
        loading: boolean;
    };
}

export const RelatorioViewInitialState: RelatorioViewState = {
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
    index: [],
    binary: {
        src: null,
        loading: false
    }
};

export function RelatorioViewReducer(state = RelatorioViewInitialState, action: RelatorioViewActions.RelatorioViewActionsAll): RelatorioViewState {
    switch (action.type) {

        case RelatorioViewActions.GET_RELATORIOS: {
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

        case RelatorioViewActions.GET_RELATORIOS_SUCCESS: {

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

        case RelatorioViewActions.GET_RELATORIOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RelatorioViewActions.UNLOAD_RELATORIOS: {

            if (action.payload.reset) {
                return {
                    ...RelatorioViewInitialState
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

        case RelatorioViewActions.SET_CURRENT_STEP: {
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

        case RelatorioViewActions.SET_CURRENT_STEP_SUCCESS: {
            return {
                ...state,
                binary: {
                    src: action.payload,
                    loading: false
                }
            };
        }

        case RelatorioViewActions.SET_CURRENT_STEP_FAILED: {
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
