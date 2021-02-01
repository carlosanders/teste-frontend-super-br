import * as ModalidadeAcaoEtiquetaEditActions from '../actions/modalidade-acao-etiqueta-edit.actions';

export interface ModalidadeAcaoEtiquetaEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ModalidadeAcaoEtiquetaEditInitialState: ModalidadeAcaoEtiquetaEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ModalidadeAcaoEtiquetaEditReducer(
    state = ModalidadeAcaoEtiquetaEditInitialState,
    action: ModalidadeAcaoEtiquetaEditActions.ModalidadeAcaoEtiquetaEditActionsAll
): ModalidadeAcaoEtiquetaEditState {
    switch (action.type) {

        case ModalidadeAcaoEtiquetaEditActions.GET_MODALIDADE_ACAO_ETIQUETA: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.CREATE_MODALIDADE_ACAO_ETIQUETA: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'modalidadeAcaoEtiquetaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.GET_MODALIDADE_ACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.SAVE_MODALIDADE_ACAO_ETIQUETA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.SAVE_MODALIDADE_ACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'modalidadeAcaoEtiquetaHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.SAVE_MODALIDADE_ACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.SAVE_COLABORADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.SAVE_COLABORADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ModalidadeAcaoEtiquetaEditActions.SAVE_COLABORADOR_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
