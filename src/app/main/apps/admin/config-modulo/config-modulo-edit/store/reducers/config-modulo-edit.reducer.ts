import * as ConfigModuleEditActions from '../actions/config-modulo-edit.actions';

export interface ConfigModuleEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ConfigModuleEditInitialState: ConfigModuleEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ConfigModuloEditReducer(
    state = ConfigModuleEditInitialState,
    action: ConfigModuleEditActions.ConfigModuleEditActionsAll
): ConfigModuleEditState {
    switch (action.type) {

        case ConfigModuleEditActions.GET_CONFIG_MODULE: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case ConfigModuleEditActions.GET_CONFIG_MODULE_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ConfigModuleEditActions.CREATE_CONFIG_MODULE: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'configModuleHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ConfigModuleEditActions.GET_CONFIG_MODULE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ConfigModuleEditActions.SAVE_CONFIG_MODULE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ConfigModuleEditActions.SAVE_CONFIG_MODULE_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'configModuleHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case ConfigModuleEditActions.SAVE_CONFIG_MODULE_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ConfigModuleEditActions.CLEAN_ERRORS: {
            return {
                ...state,
                errors: false
            };
        }

        default:
            return state;
    }
}
