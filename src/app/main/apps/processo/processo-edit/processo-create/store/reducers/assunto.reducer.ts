import * as AssuntoActions from '../actions/assunto.actions';

export interface AssuntoState {
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

export const AssuntoInitialState: AssuntoState = {
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
    errors: false
};

export function AssuntoReducer(state = AssuntoInitialState, action: AssuntoActions.AssuntoActionsAll): AssuntoState {
    switch (action.type) {

        case AssuntoActions.GET_ASSUNTOS: {
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

        case AssuntoActions.GET_ASSUNTOS_SUCCESS: {

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

        case AssuntoActions.GET_ASSUNTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssuntoActions.RELOAD_ASSUNTOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssuntoActions.UNLOAD_ASSUNTOS: {

            if (action.payload.reset) {
                return {
                    ...AssuntoInitialState
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

        case AssuntoActions.DELETE_ASSUNTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.assuntoId]
            };
        }

        case AssuntoActions.DELETE_ASSUNTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case AssuntoActions.DELETE_ASSUNTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        case AssuntoActions.SAVE_ASSUNTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AssuntoActions.SAVE_ASSUNTO_SUCCESS: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AssuntoActions.SAVE_ASSUNTO_FAILED: {
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
