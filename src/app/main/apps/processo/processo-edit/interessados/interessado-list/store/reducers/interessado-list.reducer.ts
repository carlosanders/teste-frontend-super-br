import * as InteressadoListActions
    from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/actions';
import * as _ from 'lodash';

export interface InteressadoListState {
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
    deletingErrors: any;
}

export const InteressadoListInitialState: InteressadoListState = {
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
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function InteressadoListReducer(state = InteressadoListInitialState, action: InteressadoListActions.InteressadoListActionsAll): InteressadoListState {
    switch (action.type) {

        case InteressadoListActions.GET_INTERESSADOS: {
            return {
                ...state,
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

        case InteressadoListActions.GET_INTERESSADOS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case InteressadoListActions.RELOAD_INTERESSADOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case InteressadoListActions.GET_INTERESSADOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case InteressadoListActions.DELETE_INTERESSADO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.interessadoId]
            };
        }

        case InteressadoListActions.DELETE_INTERESSADO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case InteressadoListActions.DELETE_INTERESSADO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        default:
            return state;
    }
}
