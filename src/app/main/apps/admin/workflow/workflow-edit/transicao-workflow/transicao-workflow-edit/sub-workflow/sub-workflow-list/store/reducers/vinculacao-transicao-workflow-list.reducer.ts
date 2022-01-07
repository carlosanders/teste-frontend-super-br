import * as fromStore from '../index';
import * as _ from 'lodash';

export interface VinculacaoTransicaoWorkflowListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        context: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const VinculacaoTransicaoWorkflowListInitialState: VinculacaoTransicaoWorkflowListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function VinculacaoVinculacaoTransicaoWorkflowListReducer(
    state = VinculacaoTransicaoWorkflowListInitialState,
    action: fromStore.VinculacaoTransicaoWorkflowListActionsAll
): VinculacaoTransicaoWorkflowListState {
    switch (action.type) {

        case fromStore.GET_VINCULACAO_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    context: action.payload.context,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }


        case fromStore.GET_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case fromStore.GET_VINCULACAO_TRANSICAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case fromStore.DELETE_VINCULACAO_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.id]
            };
        }

        case fromStore.DELETE_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                entitiesId: state.entitiesId.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case fromStore.DELETE_VINCULACAO_TRANSICAO_WORKFLOW_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        case fromStore.UNLOAD_VINCULACAO_TRANSICAO_WORKFLOW: {
            return {
                ...VinculacaoTransicaoWorkflowListInitialState
            };
        }


        default:
            return state;
    }
}
