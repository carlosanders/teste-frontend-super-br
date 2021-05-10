import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    processoId: number;
    loading: boolean;
    loaded: any;
    errors: any;
    savingVinculacaoEtiquetaId: number;
    steps: boolean;
    expandir: boolean;
    acompanhamentoId: number;
    entityId: number;
    entitiesId: number[];
    saving: boolean;
    deletingIds: number[];
    deletedIds: number[];
}

export const ProcessoInitialState: ProcessoState = {
    processoId: null,
    loading: false,
    loaded: false,
    errors: false,
    savingVinculacaoEtiquetaId: null,
    steps: false,
    expandir: false,
    entityId: null,
    entitiesId: [],
    acompanhamentoId: null,
    saving: false,
    deletingIds: [],
    deletedIds: [],
};

export function ProcessoReducer(state = ProcessoInitialState, action: ProcessoActions.ProcessoActionsAll): ProcessoState {
    switch (action.type) {

        case ProcessoActions.CREATE_PROCESSO: {
            return {
                ...state,
                processoId: null,
                loaded: {
                    id: 'processoHandle',
                    value: 'criar',
                    acessoNegado: false
                },
                loading: false,
                errors: false,
                savingVinculacaoEtiquetaId: null,
                steps: false
            };
        }

        case ProcessoActions.EXPANDIR_PROCESSO: {
            return {
                ...state,
                expandir: action.payload
            };
        }

        case ProcessoActions.UNLOAD_PROCESSO: {
            return {
                ...state,
                processoId: null,
                loaded: {
                    id: undefined,
                    value: undefined,
                    acessoNegado: false
                },
                loading: false,
                errors: false,
                savingVinculacaoEtiquetaId: null,
                steps: false
            };
        }

        case ProcessoActions.GET_PROCESSO: {
            return {
                ...state,
                processoId: null,
                loaded: false,
                loading: true,
                errors: false,
                savingVinculacaoEtiquetaId: null,
                steps: false
            };
        }

        case ProcessoActions.GET_PROCESSO_SUCCESS: {
            return {
                ...state,
                processoId: action.payload.processoId,
                loading: false,
                loaded: action.payload.loaded,
                errors: false,
                savingVinculacaoEtiquetaId: null,
                steps: false
            };
        }

        case ProcessoActions.GET_PROCESSO_FAILED: {
            return {
                ...state,
                processoId: null,
                loading: false,
                loaded: false,
                errors: action.payload,
                savingVinculacaoEtiquetaId: null,
                steps: false
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                errors: false,
                savingVinculacaoEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                errors: false,
                savingVinculacaoEtiquetaId: null
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                errors: action.payload,
                savingVinculacaoEtiquetaId: null
            };
        }

        case ProcessoActions.SET_STEPS: {
            return {
                ...state,
                steps: action.payload.steps
            };
        }

        case ProcessoActions.GET_ACOMPANHAMENTO: {
            return {
                ...state,
                loading: true
            };
        }

        case ProcessoActions.GET_ACOMPANHAMENTO_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                entityId: [ ...action.payload.entitiesId].pop(),
                loading: false,
                loaded
            };
        }

        case ProcessoActions.GET_ACOMPANHAMENTO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ProcessoActions.UNLOAD_ACOMPANHAMENTO: {

            if (action.payload.reset) {
                return {
                    ...ProcessoInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: []
                };
            }
        }

        case ProcessoActions.CREATE_ACOMPANHAMENTO: {
            return {
                ...state,
                acompanhamentoId: null,
                loading: false
            };
        }

        case ProcessoActions.SAVE_ACOMPANHAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ProcessoActions.SAVE_ACOMPANHAMENTO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                saving: false,
                errors: false
            };
        }

        case ProcessoActions.SAVE_ACOMPANHAMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ProcessoActions.DELETE_ACOMPANHAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case ProcessoActions.DELETE_ACOMPANHAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case ProcessoActions.DELETE_ACOMPANHAMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }


        default:
            return state;
    }
}
