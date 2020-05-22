import * as TemplatesEditActions from '../actions/templates-edit.actions';

export interface TemplatesEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TemplatesEditInitialState: TemplatesEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TemplatesEditReducer(
    state = TemplatesEditInitialState,
    action: TemplatesEditActions.TemplatesEditActionsAll
): TemplatesEditState {
    switch (action.type) {

        case TemplatesEditActions.GET_TEMPLATES: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TemplatesEditActions.GET_TEMPLATES_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TemplatesEditActions.CREATE_TEMPLATES: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'templateHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TemplatesEditActions.GET_TEMPLATES_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TemplatesEditActions.SAVE_TEMPLATES: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TemplatesEditActions.SAVE_TEMPLATES_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case TemplatesEditActions.SAVE_TEMPLATES_FAILED: {
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
