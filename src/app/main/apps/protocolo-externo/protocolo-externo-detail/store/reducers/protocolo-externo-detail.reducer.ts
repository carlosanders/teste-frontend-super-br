import * as ProcessoDetailActions from '../actions';

export interface ProcessoDetailState {
    // processoId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    errors: any;
    documentosId: number[];
    documentosLoaded: any;
    savingVinculacaoEtiquetaId: number;
}

export const ProcessoDetailInitialState: ProcessoDetailState = {
    // processoId: null,
    loading: false,
    loaded: false,
    saving: false,
    deleting: false,
    errors: false,
    documentosId: [],
    documentosLoaded: false,
    savingVinculacaoEtiquetaId: null
};

export function ProtocoloExternoDetailReducer(state = ProcessoDetailInitialState, action: ProcessoDetailActions.ProcessoDetailActionsAll): ProcessoDetailState {
    switch (action.type) {

        case ProcessoDetailActions.GET_PROCESSO: {
            return {
                ...state,
                loading: true
            };
        }

        case ProcessoDetailActions.GET_PROCESSO_SUCCESS: {

            return {
                ...state,
                // processoId: action.payload.processo.id,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ProcessoDetailActions.GET_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ProcessoDetailActions.DELETE_PROCESSO: {
            return {
                ...state,
                deleting: true
            };
        }

        case ProcessoDetailActions.DELETE_PROCESSO_SUCCESS: {
            return {
                ...state,
                deleting: false
            };
        }

        case ProcessoDetailActions.CREATE_PROCESSO: {
            return {
                // processoId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
                deleting: false,
                documentosId: [],
                documentosLoaded: false,
                savingVinculacaoEtiquetaId: null
            };
        }

        case ProcessoDetailActions.SAVE_PROCESSO: {
            return {
                ...state,
                saving: true
            };
        }

        case ProcessoDetailActions.SAVE_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProcessoDetailActions.SAVE_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ProcessoDetailActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }


        case ProcessoDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                saving: true,
                savingVinculacaoEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case ProcessoDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                savingVinculacaoEtiquetaId: null
            };
        }

        case ProcessoDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                savingVinculacaoEtiquetaId: null
            };
        }


        default:
            return state;
    }
}
