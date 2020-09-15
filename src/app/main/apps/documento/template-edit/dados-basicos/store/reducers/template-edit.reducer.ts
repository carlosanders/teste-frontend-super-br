import * as TemplateEditActions from '../actions/template-edit.actions';

export interface TemplateEditDadosBasicosState {
    templateId: number;
    loaded: any;
    loading: boolean;
    saving: boolean;
    errors: any;
}

export const TemplateEditInitialState: TemplateEditDadosBasicosState = {
    templateId: null,
    loading: false,
    loaded: false,
    saving: false,
    errors: false
};

export function TemplateEditDadosBasicosReducer(state = TemplateEditInitialState, action: TemplateEditActions.TemplateEditActionsAll): TemplateEditDadosBasicosState {

    switch (action.type) {

        case TemplateEditActions.GET_TEMPLATE: {
            return {
                ...state,
                loading: true
            };
        }

        case TemplateEditActions.GET_TEMPLATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                templateId: action.payload.templateId,
                loaded: action.payload.loaded
            };
        }

        case TemplateEditActions.GET_TEMPLATE_FAILED: {
            return {
                ...state,
                loading: false,
                templateId: null,
                loaded: false
            };
        }

        case TemplateEditActions.SAVE_TEMPLATE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TemplateEditActions.SAVE_TEMPLATE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case TemplateEditActions.SAVE_TEMPLATE_FAILED: {
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
