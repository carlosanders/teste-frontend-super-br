import * as ValidacaoTransicaoWorkflowListActions from '../actions';
import * as _ from 'lodash';

export interface ValidacaoTransicaoWorkflowListState {
    entitiesId: number[];
    transicaoWorkflowId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const ValidacaoTransicaoWorkflowListInitialState: ValidacaoTransicaoWorkflowListState = {
    entitiesId: [],
    transicaoWorkflowId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function ValidacaoTransicaoWorkflowListReducer(
    state = ValidacaoTransicaoWorkflowListInitialState,
    action: ValidacaoTransicaoWorkflowListActions.ValidacaoListActionsAll
): ValidacaoTransicaoWorkflowListState {
    switch (action.type) {

        case ValidacaoTransicaoWorkflowListActions.GET_VALIDACOES: {
            return {
                ...state,
                loading: true,
                transicaoWorkflowId: action.payload
            };
        }

        case ValidacaoTransicaoWorkflowListActions.GET_VALIDACOES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case ValidacaoTransicaoWorkflowListActions.RELOAD_VALIDACOES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case ValidacaoTransicaoWorkflowListActions.GET_VALIDACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ValidacaoTransicaoWorkflowListActions.DELETE_VALIDACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.validacaoId]
            };
        }

        case ValidacaoTransicaoWorkflowListActions.DELETE_VALIDACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(this.state.deletingErrors, [action.payload]),
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case ValidacaoTransicaoWorkflowListActions.DELETE_VALIDACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== parseInt(Object.keys(action.payload)[0])),
                deletingErrors: {
                    ...state.deletingErrors,
                    ...action.payload
                }
            };
        }

        default:
            return state;
    }
}
