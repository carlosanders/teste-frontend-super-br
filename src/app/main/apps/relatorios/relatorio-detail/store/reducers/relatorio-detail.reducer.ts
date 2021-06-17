import * as RelatorioDetailActions
    from 'app/main/apps/relatorios/relatorio-detail/store/actions/relatorio-detail.actions';

export interface RelatorioDetailState {
    relatorioId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    deleting: boolean;
    errors: any;
    documentosId: number[];
    documentosLoaded: any;
    savingVincEtiquetaId: number;
}

export const RelatorioDetailInitialState: RelatorioDetailState = {
    relatorioId: null,
    loading: false,
    loaded: false,
    saving: false,
    deleting: false,
    errors: false,
    documentosId: [],
    documentosLoaded: false,
    savingVincEtiquetaId: null
};

export function RelatorioDetailReducer(state = RelatorioDetailInitialState, action: RelatorioDetailActions.RelatorioDetailActionsAll): RelatorioDetailState {
    switch (action.type) {

        case RelatorioDetailActions.GET_RELATORIO: {
            return {
                ...state,
                loading: true
            };
        }

        case RelatorioDetailActions.GET_RELATORIO_SUCCESS: {

            return {
                ...state,
                relatorioId: action.payload.relatorio.id,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RelatorioDetailActions.GET_RELATORIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RelatorioDetailActions.DELETE_RELATORIO: {
            return {
                ...state,
                deleting: true
            };
        }

        case RelatorioDetailActions.DELETE_RELATORIO_SUCCESS: {
            return {
                ...state,
                deleting: false
            };
        }

        case RelatorioDetailActions.CREATE_RELATORIO: {
            return {
                relatorioId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
                deleting: false,
                documentosId: [],
                documentosLoaded: false,
                savingVincEtiquetaId: null
            };
        }

        case RelatorioDetailActions.SAVE_RELATORIO: {
            return {
                ...state,
                saving: true
            };
        }

        case RelatorioDetailActions.SAVE_RELATORIO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RelatorioDetailActions.SAVE_RELATORIO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RelatorioDetailActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }


        case RelatorioDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                saving: true,
                savingVincEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case RelatorioDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                savingVincEtiquetaId: null
            };
        }

        case RelatorioDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                savingVincEtiquetaId: null
            };
        }


        default:
            return state;
    }
}
