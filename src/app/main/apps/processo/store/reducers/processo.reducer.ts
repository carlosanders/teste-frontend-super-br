import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    processoId: number;
    loading: boolean;
    loaded: any;
    errors: any;
    savingVinculacaoEtiquetaId: number;
    steps: boolean;
}

export const ProcessoInitialState: ProcessoState = {
    processoId: null,
    loading: false,
    loaded: false,
    errors: false,
    savingVinculacaoEtiquetaId: null,
    steps: false
};

export function ProcessoReducer(state = ProcessoInitialState, action: ProcessoActions.ProcessoActionsAll): ProcessoState {
    switch (action.type) {

        case ProcessoActions.CREATE_PROCESSO: {
            return {
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

        case ProcessoActions.UNLOAD_PROCESSO: {
            return {
                processoId: null,                
//                loaded: undefined,
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

        default:
            return state;
    }
}
