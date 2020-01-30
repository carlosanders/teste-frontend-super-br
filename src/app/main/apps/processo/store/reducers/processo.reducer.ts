import * as ProcessoActions from '../actions/processo.actions';

export interface ProcessoState {
    processoId: number;
    loading: boolean;
    loaded: any;
    savingVincEtiquetaId: number;    
}

export const ProcessoInitialState: ProcessoState = {
    processoId: null,
    loading: false,
    loaded: false,
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
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.GET_PROCESSO: {
            return {
                processoId: null,
                loaded: false,
                loading: true,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.GET_PROCESSO_SUCCESS: {

            return {
                processoId: action.payload.processoId,
                loading: false,
                loaded: action.payload.loaded,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.GET_PROCESSO_FAILED: {
            return {
                processoId: null,
                loading: false,
                loaded: false,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                savingVincEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                savingVincEtiquetaId: null
            };
        }

        case ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                savingVincEtiquetaId: null
            };
        }        

        default:
            return state;
    }
}
