import * as AssuntoAdministrativoListActions from '../actions';

export interface AssuntoAdministrativoListState {
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

export const AssuntoAdministrativoListInitialState: AssuntoAdministrativoListState = {
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

export function AssuntoAdministrativoListReducer(
    state = AssuntoAdministrativoListInitialState,
    action: AssuntoAdministrativoListActions.AssuntoAdministrativoListActionsAll
): AssuntoAdministrativoListState {
    switch (action.type) {

        case AssuntoAdministrativoListActions.GET_ASSUNTO_ADMINISTRATIVO: {
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

        case AssuntoAdministrativoListActions.GET_ASSUNTO_ADMINISTRATIVO_SUCCESS: {
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

        case AssuntoAdministrativoListActions.GET_ASSUNTO_ADMINISTRATIVO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssuntoAdministrativoListActions.UNLOAD_ASSUNTO_ADMINISTRATIVO: {
            return {
                ...AssuntoAdministrativoListInitialState
            };
        }

        case AssuntoAdministrativoListActions.RELOAD_ASSUNTO_ADMINISTRATIVO: {
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
