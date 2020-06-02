import * as AssuntoActions from '../actions/assunto.actions';

export interface AssuntoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
}

export const AssuntoInitialState: AssuntoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export function AssuntoReducer(state = AssuntoInitialState, action: AssuntoActions.AssuntoActionsAll): AssuntoState {
    switch (action.type) {

        case AssuntoActions.GET_ASSUNTOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
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

        default:
            return state;
    }
}
