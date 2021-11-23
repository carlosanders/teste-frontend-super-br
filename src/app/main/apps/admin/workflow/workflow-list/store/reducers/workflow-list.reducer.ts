import * as WorkflowListActions from '../actions';
import * as _ from 'lodash';

export interface WorkflowListState {
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

export const WorkflowListInitialState: WorkflowListState = {
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

export function WorkflowListReducer(
    state = WorkflowListInitialState,
    action: WorkflowListActions.WorkflowListActionsAll
): WorkflowListState {
    switch (action.type) {

        case WorkflowListActions.GET_WORKFLOW: {
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


        case WorkflowListActions.GET_WORKFLOW_SUCCESS: {
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

        case WorkflowListActions.GET_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case WorkflowListActions.UNLOAD_WORKFLOW: {
            return {
                ...WorkflowListInitialState
            };
        }

        case WorkflowListActions.RELOAD_WORKFLOW: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case WorkflowListActions.DELETE_WORKFLOW: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.workflowId]
            };
        }

        case WorkflowListActions.DELETE_WORKFLOW_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case WorkflowListActions.DELETE_WORKFLOW_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }


        default:
            return state;
    }
}
