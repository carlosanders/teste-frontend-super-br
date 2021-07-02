import * as SetorListActions from '../actions';
import * as _ from 'lodash';

export interface SetorListState {
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
    deletingErrors: any;
}

export const SetorListInitialState: SetorListState = {
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
    deletingIds: [],
    deletingErrors: {}
};

export function SetorListReducer(
    state = SetorListInitialState,
    action: SetorListActions.SetorListActionsAll
): SetorListState {
    switch (action.type) {

        case SetorListActions.GET_SETORES: {
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

        case SetorListActions.GET_SETORES_SUCCESS: {

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

        case SetorListActions.RELOAD_SETORES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case SetorListActions.GET_SETORES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case SetorListActions.DELETE_SETOR: {
            console.log('dele');
            console.log(state);
            let x = [...state.deletingIds, action.payload];
            console.log(x);
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case SetorListActions.DELETE_SETOR_SUCCESS: {
            console.log('suce');
            console.log(state);
            console.log(action);
            let x = [...state.deletedIds, action.payload];
            console.log("[...state.deletedIds, action.payload]");
            console.log(x);

            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case SetorListActions.DELETE_SETOR_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== parseInt(Object.keys(action.payload)[0])),
                deletingErrors: {
                    ...state.deletingErrors,
                    ...action.payload
                }
            };
        }

        case SetorListActions.TRANSFERIR_PROCESSOS_PROTOCOLO: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case SetorListActions.TRANSFERIR_PROCESSOS_PROTOCOLO_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true
            };
        }

        case SetorListActions.TRANSFERIR_PROCESSOS_PROTOCOLO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: true
            };
        }

        default:
            return state;
    }
}
