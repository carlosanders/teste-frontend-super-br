import * as UsuariosExternosListActions from '../actions';

export interface UsuariosExternosListState {
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
}

export const UsuariosExternosListInitialState: UsuariosExternosListState = {
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

};

export function UsuariosExternosListReducer(
    state = UsuariosExternosListInitialState,
    action: UsuariosExternosListActions.UsuariosExternosListActionsAll
): UsuariosExternosListState {
    switch (action.type) {

        case UsuariosExternosListActions.GET_USUARIOS_EXTERNOS: {
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

        case UsuariosExternosListActions.GET_USUARIOS_EXTERNOS_SUCCESS: {
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

        case UsuariosExternosListActions.GET_USUARIOS_EXTERNOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case UsuariosExternosListActions.RELOAD_USUARIOS_EXTERNOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}