import * as TesteActions from 'app/main/apps/teste/store/actions/teste.actions';
import { Tarefa } from '@cdk/models/tarefa.model';

export interface TesteState {
    entities: Tarefa[];
    total: number;
    loading: boolean;
    currentTeste: {
        teste: Tarefa;
        loading: boolean;
        loaded: any,
        saving: boolean;
        errors: any;
    };
    deletingTesteIds: number[];
    deletedTesteIds: number[];
}

export const TesteInitialState: TesteState = {
    entities: [],
    total: 0,
    loading: false,
    currentTeste: {
        teste: null,
        loading: false,
        loaded: false,
        saving: false,
        errors: false
    },
    deletingTesteIds: [],
    deletedTesteIds: []
};

export function TesteReducer(state = TesteInitialState, action: TesteActions.TesteActionsAll): TesteState {
    switch (action.type) {

        case TesteActions.GET_TESTE: {
            return {
                ...state,
                loading: true
            };
        }

        case TesteActions.GET_TESTE_SUCCESS: {

            const entities = action.payload.entities;
            const total = action.payload.total;

            return {
                ...state,
                entities,
                total,
                loading: false
            };
        }

        case TesteActions.GET_TESTE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TesteActions.DELETE_TESTE: {
            return {
                ...state,
                deletingTesteIds: [...state.deletingTesteIds, action.payload]
            };
        }

        case TesteActions.DELETE_TESTE_SUCCESS: {
            return {
                ...state,
                deletingTesteIds: state.deletingTesteIds.filter(id => id !== action.payload),
                deletedTesteIds: [...state.deletedTesteIds, action.payload]
            };
        }

        case TesteActions.GET_CURRENT_TESTE: {
            return {
                ...state,
                currentTeste: {
                    teste: null,
                    loading: true,
                    loaded: false,
                    saving: false,
                    errors: false
                }
            };
        }

        case TesteActions.GET_CURRENT_TESTE_SUCCESS: {
            return {
                ...state,
                currentTeste: {
                    teste: action.payload.teste,
                    loading: false,
                    loaded: action.payload.loaded,
                    saving: false,
                    errors: false
                }
            };
        }

        case TesteActions.EDIT_TESTE: {
            return {
                ...state,
                currentTeste: {
                    teste: action.payload,
                    loading: false,
                    loaded: false,
                    saving: false,
                    errors: false
                }
            };
        }

        case TesteActions.CREATE_TESTE: {
            return {
                ...state,
                currentTeste: {
                    teste: action.payload,
                    loading: false,
                    loaded: false,
                    saving: false,
                    errors: false
                }
            };
        }

        case TesteActions.SAVE_TESTE: {
            return {
                ...state,
                currentTeste: {
                    ...state.currentTeste,
                    teste: action.payload,
                    saving: true
                }
            };
        }

        case TesteActions.SAVE_TESTE_SUCCESS: {
            return {
                ...state,
                currentTeste: {
                    teste: action.payload,
                    loading: false,
                    loaded: false,
                    saving: false,
                    errors: false
                }
            };
        }

        case TesteActions.SAVE_TESTE_FAILED: {
            return {
                ...state,
                currentTeste: {
                    ...state.currentTeste,
                    saving: false,
                    errors: action.payload
                }
            };
        }

        default:
            return state;
    }
}
