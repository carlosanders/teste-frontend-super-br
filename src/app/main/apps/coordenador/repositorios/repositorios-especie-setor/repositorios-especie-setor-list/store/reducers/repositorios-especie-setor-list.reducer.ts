import * as RepositoriosEspecieSetorListActions from '../actions';

export interface RepositoriosEspecieSetorListState {
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

export const RepositoriosEspecieSetorListInitialState: RepositoriosEspecieSetorListState = {
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

export function RepositoriosEspecieSetorListReducer(
    state = RepositoriosEspecieSetorListInitialState,
    action: RepositoriosEspecieSetorListActions.RepositoriosEspecieSetorActionsAll
): RepositoriosEspecieSetorListState {
    switch (action.type) {

        case RepositoriosEspecieSetorListActions.GET_REPOSITORIOS_ESPECIE_SETOR: {
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

        case RepositoriosEspecieSetorListActions.GET_REPOSITORIOS_ESPECIE_SETOR_SUCCESS: {

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

        case RepositoriosEspecieSetorListActions.UNLOAD_REPOSITORIOS_ESPECIE_SETOR: {
            return {
                ...RepositoriosEspecieSetorListInitialState
            };
        }

        case RepositoriosEspecieSetorListActions.RELOAD_REPOSITORIOS_ESPECIE_SETOR: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RepositoriosEspecieSetorListActions.GET_REPOSITORIOS_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RepositoriosEspecieSetorListActions.DELETE_REPOSITORIO_ESPECIE_SETOR: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case RepositoriosEspecieSetorListActions.DELETE_REPOSITORIO_ESPECIE_SETOR_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case RepositoriosEspecieSetorListActions.DELETE_REPOSITORIO_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
