import * as ProcessoEtiquetaViewActions from '../actions/processo-etiqueta-view.actions';

export interface ProcessoEtiquetaViewState {
    loading: boolean;
    loaded: any;
    binary: {
        src: any;
        loading: boolean;
    };
}

export const ProcessoEtiquetaViewInitialState: ProcessoEtiquetaViewState = {
    loading: false,
    loaded: false,
    binary: {
        src: null,
        loading: false
    }
};

export function ProcessoEtiquetaViewReducer(
    state = ProcessoEtiquetaViewInitialState,
    action: ProcessoEtiquetaViewActions.ProcessoEtiquetaViewActionsAll
): ProcessoEtiquetaViewState {
    switch (action.type) {

        case ProcessoEtiquetaViewActions.GET_PROCESSO_ETIQUETA: {
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

        case ProcessoEtiquetaViewActions.GET_PROCESSO_ETIQUETA_SUCCESS: {

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
