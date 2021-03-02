import * as DadosBasicosActions from '../actions/dados-basicos.actions';

export interface DadosBasicosState {
    saving: boolean;
    errors: any;
    loaded: any;
    loading: boolean;
    processoId: number;
    nupInvalido: boolean;
}

export const DadosBasicosInitialState: DadosBasicosState = {
    saving: false,
    errors: false,
    loaded: false,
    loading: false,
    processoId: null,
    nupInvalido: true
};

export function DadosBasicosReducer(state = DadosBasicosInitialState, action: DadosBasicosActions.DadosBasicosActionsAll): DadosBasicosState {
    switch (action.type) {

        case DadosBasicosActions.GET_PROCESSO: {
            return {
                processoId: null,
                nupInvalido: false,
                loaded: false,
                loading: true,
                saving: false,
                errors: false,
            };
        }

        case DadosBasicosActions.GET_PROCESSO_SUCCESS: {

            return {
                processoId: action.payload.processoId,
                nupInvalido: false,
                loading: false,
                loaded: action.payload.loaded,
                saving: false,
                errors: false
            };
        }

        case DadosBasicosActions.GET_PROCESSO_FAILED: {
            return {
                processoId: null,
                nupInvalido: false,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
            };
        }

        case DadosBasicosActions.CREATE_PROCESSO: {
            return {
                processoId: null,
                nupInvalido: false,
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
                nupInvalido: false,
                loaded: {
                    id: undefined,
                    value: undefined,
                    acessoNegado: false
                },
                loading: false,
                saving: false,
                errors: false
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
                saving: true,
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

        case DadosBasicosActions.VALIDA_NUP: {
            return {
                ...state,
                nupInvalido: true
            };
        }

        case DadosBasicosActions.VALIDA_NUP_SUCCESS: {
            return {
                ...state,
                nupInvalido: true
            };
        }

        case DadosBasicosActions.VALIDA_NUP_FAILED: {
            return {
                ...state,
                nupInvalido: true,
                errors: action.payload
            };
        }

        case DadosBasicosActions.VALIDA_NUP_INVALID: {
            return {
                ...state,
                nupInvalido: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
