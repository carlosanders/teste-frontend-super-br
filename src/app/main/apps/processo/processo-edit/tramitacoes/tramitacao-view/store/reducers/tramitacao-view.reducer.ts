import * as TramitacaoViewActions from '../actions/tramitacao-view.actions';

export interface TramitacaoViewState {
    loading: boolean;
    loaded: any;
    binary: {
        src: any;
        loading: boolean;
    };
}

export const TramitacaoViewInitialState: TramitacaoViewState = {
    loading: false,
    loaded: false,
    binary: {
        src: null,
        loading: false
    }
};

export function TramitacaoViewReducer(
    state = TramitacaoViewInitialState,
    action: TramitacaoViewActions.TramitacaoViewActionsAll
): TramitacaoViewState {
    switch (action.type) {

        case TramitacaoViewActions.GET_GUIA_TRAMITACAO: {
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

        case TramitacaoViewActions.GET_GUIA_TRAMITACAO_SUCCESS: {

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
