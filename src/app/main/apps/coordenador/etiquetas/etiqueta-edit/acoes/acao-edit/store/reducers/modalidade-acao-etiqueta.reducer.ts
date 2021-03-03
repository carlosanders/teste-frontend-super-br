import * as ModalidadeAcaoEtiquetaActions from '../actions/modalidade-acao-etiqueta.actions';

export interface ModalidadeAcaoEtiquetaState {
    entitiesId: number[];
    loading: boolean;
    loaded: any;
}

export const ModalidadeAcaoEtiquetaInitialState: ModalidadeAcaoEtiquetaState = {
    entitiesId: [],
    loading: false,
    loaded: false
};

export function ModalidadeAcaoEtiqueraReducer(
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
