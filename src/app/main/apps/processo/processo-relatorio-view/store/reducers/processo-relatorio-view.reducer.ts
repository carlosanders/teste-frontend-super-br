import * as ProcessoRelatorioViewActions from '../actions/processo-relatorio-view.actions';

export interface ProcessoRelatorioViewState {
    loading: boolean;
    loaded: any;
    binary: {
        src: any;
        loading: boolean;
    };
}

export const ProcessoRelatorioViewInitialState: ProcessoRelatorioViewState = {
    loading: false,
    loaded: false,
    binary: {
        src: null,
        loading: false
    }
};

export function ProcessoRelatorioViewReducer(
    state = ProcessoRelatorioViewInitialState,
    action: ProcessoRelatorioViewActions.ProcessoRelatorioViewActionsAll
): ProcessoRelatorioViewState {
    switch (action.type) {

        case ProcessoRelatorioViewActions.GET_PROCESSO_RELATORIO: {
            return {
                ...state,
                loading: true,
                binary: {
                    src: null,
                    loading: true
                },
                loaded: false
            };
        }

        case ProcessoRelatorioViewActions.GET_PROCESSO_RELATORIO_SUCCESS: {

            return {
                ...state,
                loaded: action.payload.loaded,
                binary: {
                    src: action.payload.loaded.componenteDigital,
                    loading: false
                },
                loading: false
            };
        }

        case ProcessoRelatorioViewActions.GET_METADADOS_PROCESSO_RELATORIO: {
            return {
                ...state,
                loading: true,
                binary: {
                    src: null,
                    loading: true
                },
                loaded: false
            };
        }

        case ProcessoRelatorioViewActions.GET_METADADOS_PROCESSO_RELATORIO_SUCCESS: {

            return {
                ...state,
                loaded: action.payload.loaded,
                binary: {
                    src: action.payload.loaded.componenteDigital,
                    loading: false
                },
                loading: false
            };
        }


        default:
            return state;
    }
}
