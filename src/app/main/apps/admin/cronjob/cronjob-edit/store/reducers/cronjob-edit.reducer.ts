import * as CronjobEditActions from '../actions/cronjob-edit.actions';

export interface CronjobEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CronjobEditInitialState: CronjobEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function CronjobEditReducer(
    state = CronjobEditInitialState,
    action: CronjobEditActions.CronjobEditActionsAll
): CronjobEditState {
    switch (action.type) {

        case CronjobEditActions.GET_CRONJOB: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case CronjobEditActions.GET_CRONJOB_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CronjobEditActions.CREATE_CRONJOB: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'cronjobHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case CronjobEditActions.GET_CRONJOB_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case CronjobEditActions.SAVE_CRONJOB: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case CronjobEditActions.SAVE_CRONJOB_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'cronjobHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case CronjobEditActions.SAVE_CRONJOB_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case CronjobEditActions.UPDATE_CRONJOB: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case CronjobEditActions.UPDATE_CRONJOB_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'cronjobHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case CronjobEditActions.UPDATE_CRONJOB_FAILED: {
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
