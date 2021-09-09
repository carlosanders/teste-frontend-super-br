import * as InteressadoActions from '../actions/interessado.actions';

export interface InteressadoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
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

export const InteressadoInitialState: InteressadoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
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

export function InteressadoReducer(state = InteressadoInitialState, action: InteressadoActions.InteressadoActionsAll): InteressadoState {
    switch (action.type) {

        case InteressadoActions.GET_INTERESSADOS: {
            return {
                ...state,
                entitiesId: [],
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case InteressadoActions.GET_INTERESSADOS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                saving: false,
                loading: false,
                loaded
            };
        }

        case InteressadoActions.GET_INTERESSADOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case InteressadoActions.RELOAD_INTERESSADOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case InteressadoActions.UNLOAD_INTERESSADOS: {

            if (action.payload.reset) {
                return {
                    ...InteressadoInitialState
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

        case InteressadoActions.DELETE_INTERESSADO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.interessadoId]
            };
        }

        case InteressadoActions.DELETE_INTERESSADO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case InteressadoActions.DELETE_INTERESSADO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        case InteressadoActions.SAVE_INTERESSADO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case InteressadoActions.SAVE_INTERESSADO_SUCCESS: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case InteressadoActions.SAVE_INTERESSADO_FAILED: {
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
