import * as fromStore from '../index';

export interface ContaEmailState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
        context: any;
    };

    loading: boolean;
    loaded: any;
    selectedContaEmailId: number,
    error: any
}

export const ContaEmailInitialState: ContaEmailState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    loading: false,
    loaded: false,
    selectedContaEmailId: null,
    error: null
};

export function ContaEmailReducer(state = ContaEmailInitialState, action: fromStore.ContaEmailActionsAll): ContaEmailState {
    switch (action.type) {

        case fromStore.GET_CONTA_EMAIL: {
            return {
                ...state,
                loading: true,
                entitiesId: (action.payload.increment ? state.entitiesId : []),
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total,
                    context: action.payload.context
                },
                error: null
            };
        }

        case fromStore.GET_CONTA_EMAIL_SUCCESS: {


            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: true,
                error: null
            };
        }

        case fromStore.GET_CONTA_EMAIL_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromStore.SET_CONTA_EMAIL: {
            return {
                ...state,
                selectedContaEmailId: action.payload
            };
        }

        default:
            return state;
    }
}


