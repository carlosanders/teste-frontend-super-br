import * as fromStore from '../index';

export interface VinculacaoEspecieProcessoWorkflowEditState {
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

export const VinculacaoEspecieProcessoWorkflowEditInitialState: VinculacaoEspecieProcessoWorkflowEditState = {
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

export function VinculacaoEspecieProcessoWorkflowEditReducer(
    state = VinculacaoEspecieProcessoWorkflowEditInitialState,
    action: fromStore.VinculacaoEspecieProcessoWorkflowEditActionsAll
): VinculacaoEspecieProcessoWorkflowEditState {
    switch (action.type) {


        case fromStore.GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case fromStore.GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case fromStore.GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case fromStore.SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case fromStore.SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'vinculacaoEspecieProcessoWorkflowHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case fromStore.SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED: {
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
