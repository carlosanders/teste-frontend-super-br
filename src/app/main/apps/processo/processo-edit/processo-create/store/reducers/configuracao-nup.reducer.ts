import * as ConfiguracaoNupActions from '../actions/configuracao-nup.actions';

export interface ConfiguracaoNupState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    saving: boolean;
    errors: any;
}

export const ConfiguracaoNupInitialState: ConfiguracaoNupState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletingIds: [],
    deletedIds: [],
    saving: false,
    errors: false,
};

export function ConfiguracaoNupReducer(state = ConfiguracaoNupInitialState, action: ConfiguracaoNupActions.ConfiguracaoNupActionsAll): ConfiguracaoNupState {
    switch (action.type) {

        case ConfiguracaoNupActions.GET_CONFIGURACOES_NUP: {
            return {
                ...state,
                entitiesId: [],
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ConfiguracaoNupActions.GET_CONFIGURACOES_NUP_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case ConfiguracaoNupActions.GET_CONFIGURACOES_NUP_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ConfiguracaoNupActions.RELOAD_CONFIGURACOES_NUP: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ConfiguracaoNupActions.UNLOAD_CONFIGURACOES_NUP: {

            if (action.payload.reset) {
                return {
                    ...ConfiguracaoNupInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: [],
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        default:
            return state;
    }
}
