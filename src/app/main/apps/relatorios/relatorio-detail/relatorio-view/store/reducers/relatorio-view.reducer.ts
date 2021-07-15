import * as RelatorioViewActions
    from 'app/main/apps/relatorios/relatorio-detail/relatorio-view/store/actions/relatorio-view.actions';

export interface RelatorioViewState {
    entityId: number;
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
    entityId: null,
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

        case RelatorioViewActions.GET_RELATORIO: {
            return {
                ...state,
                index: [],
                loading: true,
            };
        }

        case RelatorioViewActions.GET_RELATORIO_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                index: action.payload.index,
                entityId: action.payload.entityId,
                loading: false,
                loaded
            };
        }

        case RelatorioViewActions.GET_RELATORIO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RelatorioViewActions.UNLOAD_RELATORIO: {

            if (action.payload.reset) {
                return {
                    ...RelatorioViewInitialState
                };
            } else {
                return {
                    ...state,
                    entityId: null,
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
