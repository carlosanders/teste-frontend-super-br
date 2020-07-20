import * as DadosBasicosActions from '../actions/dados-basicos.actions';

export interface DadosBasicosState {
    saving: boolean;
    errors: any;
    loaded: any;
    loading: boolean;
    processoId: number;
}

export const DadosBasicosInitialState: DadosBasicosState = {
    saving: false,
    errors: false,
    loaded: false,
    loading: false,
    processoId: null,
};

export function DadosBasicosReducer(state = DadosBasicosInitialState, action: DadosBasicosActions.DadosBasicosActionsAll): DadosBasicosState {
    switch (action.type) {

        case DadosBasicosActions.GET_PROCESSO: {
            return {
                processoId: null,
                loaded: false,
                loading: true,
                saving: false,
                errors: false,
            };
        }

        case DadosBasicosActions.GET_PROCESSO_FAILED: {
            return {
                processoId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
            };
        }

        case DadosBasicosActions.CREATE_PROCESSO: {
            return {
                processoId: null,                
                loaded: {
                    id: 'processoHandle',
                    value: 'criar',
                    acessoNegado: false
                },
                loading: false,
                saving: false,
                errors: false,   
            };
        }

        case DadosBasicosActions.UNLOAD_PROCESSO: {
            return {
                processoId: undefined,                
                loaded: {
                    id: undefined,
                    value: undefined,
                    acessoNegado: false
                },
                loading: false,
                saving: false,
                errors: false,   
            };
        }

        case DadosBasicosActions.SET_PROCESSO: {
            return {
                ...state,
                loaded: action.payload
            };
        }

        case DadosBasicosActions.SAVE_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DadosBasicosActions.POST_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DadosBasicosActions.PUT_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DadosBasicosActions.SAVE_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DadosBasicosActions.PUT_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DadosBasicosActions.POST_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DadosBasicosActions.SAVE_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case DadosBasicosActions.POST_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case DadosBasicosActions.PUT_PROCESSO_FAILED: {
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
