import * as ConfigModuleListActions from '../actions';

export interface ConfigModuleListState {
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
}

export const ConfigModuleListInitialState: ConfigModuleListState = {
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
    deletingIds: []
};

export function ConfigModuloListReducer(
    state = ConfigModuleListInitialState,
    action: ConfigModuleListActions.ConfigModuleListActionsAll
): ConfigModuleListState {
    switch (action.type) {

        case ConfigModuleListActions.GET_CONFIG_MODULO: {
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

        case ConfigModuleListActions.GET_CONFIG_MODULO_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case ConfigModuleListActions.GET_CONFIG_MODULO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ConfigModuleListActions.RELOAD_CONFIG_MODULO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ConfigModuleListActions.DELETE_CONFIG_MODULO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case ConfigModuleListActions.DELETE_CONFIG_MODULO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case ConfigModuleListActions.DELETE_CONFIG_MODULO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
