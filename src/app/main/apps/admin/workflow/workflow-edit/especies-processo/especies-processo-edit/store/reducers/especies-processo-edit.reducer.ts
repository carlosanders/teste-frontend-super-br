import * as WorkflowEspeciesProcessoEditActions from '../actions/especies-processo-edit.actions';

export interface WorkflowEspeciesProcessoEditState {
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

export const WorkflowEspeciesProcessoEditInitialState: WorkflowEspeciesProcessoEditState = {
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

export function WorkflowEspeciesProcessoEditReducer(
    state = WorkflowEspeciesProcessoEditInitialState,
    action: WorkflowEspeciesProcessoEditActions.WorkflowEspecieProcessoEditActionsAll
): WorkflowEspeciesProcessoEditState {
    switch (action.type) {


        case WorkflowEspeciesProcessoEditActions.GET_ESPECIE_PROCESSO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case WorkflowEspeciesProcessoEditActions.GET_ESPECIE_PROCESSO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case WorkflowEspeciesProcessoEditActions.GET_ESPECIE_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case WorkflowEspeciesProcessoEditActions.UPDATE_ESPECIE_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case WorkflowEspeciesProcessoEditActions.UPDATE_ESPECIE_PROCESSO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'especieProcessoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case WorkflowEspeciesProcessoEditActions.UPDATE_ESPECIE_PROCESSO_FAILED: {
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
