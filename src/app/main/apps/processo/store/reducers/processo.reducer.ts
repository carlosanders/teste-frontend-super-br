import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    processoId: number;
    loading: boolean;
    loaded: any;
    errors: any;
    savingVincEtiquetaId: number;    
}

export const ProcessoInitialState: ProcessoState = {
    processoId: null,
    loading: false,
    loaded: false,
    errors: false,
    savingVincEtiquetaId: null    
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
                savingVincEtiquetaId: null
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
            };
        }


        case ProcessoActions.GET_PROCESSO: {
            return {
                processoId: null,
                loaded: false,
                loading: true,
                errors: false,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.GET_PROCESSO_SUCCESS: {

            return {
                processoId: action.payload.processoId,
                loading: false,
                loaded: action.payload.loaded,
                errors: false,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.GET_PROCESSO_FAILED: {
            return {
                processoId: null,
                loading: false,
                loaded: false,
                errors: action.payload,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                errors: false,
                savingVincEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                errors: false,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                errors: action.payload,
                savingVincEtiquetaId: null
            };
        }        

        default:
            return state;
    }
}
