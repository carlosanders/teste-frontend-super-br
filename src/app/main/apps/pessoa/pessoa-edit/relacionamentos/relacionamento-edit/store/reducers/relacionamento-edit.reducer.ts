import * as RelacionamentoEditActions from '../actions/relacionamento-edit.actions';

export interface RelacionamentoEditState {
    relacionamentoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RelacionamentoEditInitialState: RelacionamentoEditState = {
    relacionamentoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RelacionamentoEditReducer(
    state = RelacionamentoEditInitialState,
    action: RelacionamentoEditActions.RelacionamentoEditActionsAll
): RelacionamentoEditState {
    switch (action.type) {

        case RelacionamentoEditActions.GET_RELACIONAMENTO: {
            return {
                ...state,
                relacionamentoId: null,
                loading: true
            };
        }

        case RelacionamentoEditActions.GET_RELACIONAMENTO_SUCCESS: {

            return {
                ...state,
                relacionamentoId: action.payload.relacionamentoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RelacionamentoEditActions.CREATE_RELACIONAMENTO: {
            return {
                ...state,
                relacionamentoId: null,
                loaded: {
                    id: 'relacionamentoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RelacionamentoEditActions.GET_RELACIONAMENTO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RelacionamentoEditActions.SAVE_RELACIONAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RelacionamentoEditActions.SAVE_RELACIONAMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RelacionamentoEditActions.SAVE_RELACIONAMENTO_FAILED: {
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
