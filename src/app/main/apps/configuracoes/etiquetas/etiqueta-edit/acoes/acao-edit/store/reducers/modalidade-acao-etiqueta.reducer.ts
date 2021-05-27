import * as ModalidadeAcaoEtiquetaActions from '../actions/modalidade-acao-etiqueta.actions';

export interface ModalidadeAcaoEtiquetaState {
    entitiesId: number[];
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ModalidadeAcaoEtiquetaInitialState: ModalidadeAcaoEtiquetaState = {
    entitiesId: [],
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ModalidadeAcaoEtiquetaReducer(
    state = ModalidadeAcaoEtiquetaInitialState,
    action: ModalidadeAcaoEtiquetaActions.ModalidadeAcaoEtiquetaActionsAll
): ModalidadeAcaoEtiquetaState {
    switch (action.type) {

        case ModalidadeAcaoEtiquetaActions.GET_MODALIDADES_ACAO_ETIQUETA: {
            return {
                ...state,
                loading: true,
            };
        }

        case ModalidadeAcaoEtiquetaActions.GET_MODALIDADES_ACAO_ETIQUETA_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case ModalidadeAcaoEtiquetaActions.GET_MODALIDADES_ACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
