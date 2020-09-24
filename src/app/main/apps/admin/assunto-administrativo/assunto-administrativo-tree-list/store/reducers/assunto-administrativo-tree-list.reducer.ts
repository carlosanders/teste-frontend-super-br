import * as AssuntoAdministrativoTreeListActions from '../actions';

export interface AssuntoAdministrativoTreeListState {
    entitiesId: any;
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
    saving: boolean;
    errors: any;
}

export const AssuntoAdministrativoTreeListInitialState: AssuntoAdministrativoTreeListState = {
    entitiesId: null,
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
    saving: false,
    errors: false,
};

export function AssuntoAdministrativoTreeListReducer(
    state = AssuntoAdministrativoTreeListInitialState,
    action: AssuntoAdministrativoTreeListActions.AssuntoAdministrativoTreeListActionsAll
): AssuntoAdministrativoTreeListState {
    switch (action.type) {

        case AssuntoAdministrativoTreeListActions.GET_ASSUNTO_ADMINISTRATIVO: {
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

        case AssuntoAdministrativoTreeListActions.GET_ASSUNTO_ADMINISTRATIVO_SUCCESS: {
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

        case AssuntoAdministrativoTreeListActions.GET_ASSUNTO_ADMINISTRATIVO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssuntoAdministrativoTreeListActions.RELOAD_ASSUNTO_ADMINISTRATIVO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssuntoAdministrativoTreeListActions.SAVE_ASSUNTO_ADMINISTRATIVO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AssuntoAdministrativoTreeListActions.SAVE_ASSUNTO_ADMINISTRATIVO_SUCCESS: {
            return {
                ...state,
                loaded: {
                    id: 'assuntoAdministrativoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false,
            };
        }

        case AssuntoAdministrativoTreeListActions.SAVE_ASSUNTO_ADMINISTRATIVO_FAILED: {
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
