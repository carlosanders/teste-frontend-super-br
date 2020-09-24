import * as TransicaoWorkflowEditActions from '../actions/transicao-workflow-edit.actions';

export interface TransicaoWorkflowEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
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
}

export const TransicaoWorkflowEditInitialState: TransicaoWorkflowEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
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
};

export function TransicaoWorkflowEditReducer(
    state = TransicaoWorkflowEditInitialState,
    action: TransicaoWorkflowEditActions.TransicaoWorkflowEditActionsAll
): TransicaoWorkflowEditState {
    switch (action.type) {


        case TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TransicaoWorkflowEditActions.CREATE_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'transicaoWorkflowHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TransicaoWorkflowEditActions.SAVE_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TransicaoWorkflowEditActions.SAVE_TRANSICAO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'transicao-workflowHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case TransicaoWorkflowEditActions.SAVE_TRANSICAO_WORKFLOW_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TransicaoWorkflowEditActions.RELOAD_TRANSICAO_WORKFLOW: {
            return {
                entityId: 0, errors: undefined, loaded: undefined, saving: false,
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

        default:
            return state;
    }
}
