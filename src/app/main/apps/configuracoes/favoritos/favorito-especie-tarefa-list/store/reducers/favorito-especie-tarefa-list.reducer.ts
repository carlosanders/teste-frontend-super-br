import * as FavoritoListEspecieTarefaActions from '../actions';

export interface FavoritoListEspecieTarefaState {
    entitiesId: number[];
    favoritoId: number;
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

export const FavoritoListEspecieTarefaInitialState: FavoritoListEspecieTarefaState = {
    saving: false,
    favoritoId: null,
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
    errors: false
};

export function FavoritoEspecieTarefaListReducer(
    state = FavoritoListEspecieTarefaInitialState,
    action: FavoritoListEspecieTarefaActions.FavoritoListEspecieTarefaActionsAll
): FavoritoListEspecieTarefaState {
    switch (action.type) {

        case FavoritoListEspecieTarefaActions.GET_FAVORITOS_ESPECIE_TAREFA: {
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

        case FavoritoListEspecieTarefaActions.GET_FAVORITOS_ESPECIE_TAREFA_SUCCESS: {

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

        case FavoritoListEspecieTarefaActions.GET_FAVORITOS_ESPECIE_TAREFA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListEspecieTarefaActions.RELOAD_FAVORITOS_ESPECIE_TAREFA: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListEspecieTarefaActions.GET_FAVORITO_ESPECIE_TAREFA: {
            return {
                ...state,
                favoritoId: null,
                loading: true
            };
        }

        case FavoritoListEspecieTarefaActions.GET_FAVORITO_ESPECIE_TAREFA_SUCCESS: {

            return {
                ...state,
                favoritoId: action.payload.favoritoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case FavoritoListEspecieTarefaActions.GET_FAVORITO_ESPECIE_TAREFA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case FavoritoListEspecieTarefaActions.DELETE_FAVORITO_ESPECIE_TAREFA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case FavoritoListEspecieTarefaActions.DELETE_FAVORITO_ESPECIE_TAREFA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case FavoritoListEspecieTarefaActions.DELETE_FAVORITO_ESPECIE_TAREFA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }


        case FavoritoListEspecieTarefaActions.SAVE_FAVORITO_ESPECIE_TAREFA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case FavoritoListEspecieTarefaActions.SAVE_FAVORITO_ESPECIE_TAREFA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case FavoritoListEspecieTarefaActions.SAVE_FAVORITO_ESPECIE_TAREFA_FAILED: {
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
