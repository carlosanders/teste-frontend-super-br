import * as FavoritoListSetorResponsavelActions from '../actions';

export interface FavoritoListSetorResponsavelState {
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

export const FavoritoListSetorResponsavelInitialState: FavoritoListSetorResponsavelState = {
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

export function FavoritoSetorResponsavelListReducer(
    state = FavoritoListSetorResponsavelInitialState,
    action: FavoritoListSetorResponsavelActions.FavoritoListSetorResponsavelActionsAll
): FavoritoListSetorResponsavelState {
    switch (action.type) {

        case FavoritoListSetorResponsavelActions.GET_FAVORITOS_SETOR_RESPONSAVEL: {
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

        case FavoritoListSetorResponsavelActions.GET_FAVORITOS_SETOR_RESPONSAVEL_SUCCESS: {

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

        case FavoritoListSetorResponsavelActions.GET_FAVORITOS_SETOR_RESPONSAVEL_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListSetorResponsavelActions.RELOAD_FAVORITOS_SETOR_RESPONSAVEL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListSetorResponsavelActions.GET_FAVORITO_SETOR_RESPONSAVEL: {
            return {
                ...state,
                favoritoId: null,
                loading: true
            };
        }

        case FavoritoListSetorResponsavelActions.GET_FAVORITO_SETOR_RESPONSAVEL_SUCCESS: {

            return {
                ...state,
                favoritoId: action.payload.favoritoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case FavoritoListSetorResponsavelActions.GET_FAVORITO_SETOR_RESPONSAVEL_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case FavoritoListSetorResponsavelActions.DELETE_FAVORITO_SETOR_RESPONSAVEL: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case FavoritoListSetorResponsavelActions.DELETE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case FavoritoListSetorResponsavelActions.DELETE_FAVORITO_SETOR_RESPONSAVEL_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }


        case FavoritoListSetorResponsavelActions.SAVE_FAVORITO_SETOR_RESPONSAVEL: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case FavoritoListSetorResponsavelActions.SAVE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case FavoritoListSetorResponsavelActions.SAVE_FAVORITO_SETOR_RESPONSAVEL_FAILED: {
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
