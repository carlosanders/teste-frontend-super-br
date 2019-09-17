import * as FavoritoListEspecieAtividadeActions from '../actions';

export interface FavoritoListEspecieAtividadeState {
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

export const FavoritoListEspecieAtividadeInitialState: FavoritoListEspecieAtividadeState = {
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

export function FavoritoEspecieAtividadeListReducer(
    state = FavoritoListEspecieAtividadeInitialState,
    action: FavoritoListEspecieAtividadeActions.FavoritoListEspecieAtividadeActionsAll
): FavoritoListEspecieAtividadeState {
    switch (action.type) {

        case FavoritoListEspecieAtividadeActions.GET_FAVORITOS_ESPECIE_ATIVIDADE: {
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

        case FavoritoListEspecieAtividadeActions.GET_FAVORITOS_ESPECIE_ATIVIDADE_SUCCESS: {

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

        case FavoritoListEspecieAtividadeActions.GET_FAVORITOS_ESPECIE_ATIVIDADE_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListEspecieAtividadeActions.RELOAD_FAVORITOS_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListEspecieAtividadeActions.GET_FAVORITO_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                favoritoId: null,
                loading: true
            };
        }

        case FavoritoListEspecieAtividadeActions.GET_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS: {

            return {
                ...state,
                favoritoId: action.payload.favoritoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case FavoritoListEspecieAtividadeActions.GET_FAVORITO_ESPECIE_ATIVIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case FavoritoListEspecieAtividadeActions.DELETE_FAVORITO_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case FavoritoListEspecieAtividadeActions.DELETE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case FavoritoListEspecieAtividadeActions.DELETE_FAVORITO_ESPECIE_ATIVIDADE_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }


        case FavoritoListEspecieAtividadeActions.SAVE_FAVORITO_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case FavoritoListEspecieAtividadeActions.SAVE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case FavoritoListEspecieAtividadeActions.SAVE_FAVORITO_ESPECIE_ATIVIDADE_FAILED: {
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
